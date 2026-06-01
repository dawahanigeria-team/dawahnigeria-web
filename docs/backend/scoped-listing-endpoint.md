# Backend request: unified scoped lecture listing (browse + search)

**Context / why.** A user reported (26 May 2026) that finding an *old* lecture is
painful: you must scroll a long, newest-first infinite list with no way to jump to
older content. Investigation confirmed the root cause is on the API, not the UI:

- `leclisting_rp.php` (lecturer) and `genre_api.php` (category) return list items
  with **no date field** (`title, audio, img, nid, duration, description, lang,
  cats, downloads, views, favorites, share, comment, rp_id, ...`).
- They **ignore ordering params** — `?sort=asc`, `?order=asc`, `?orderby=date`,
  `?sortby=oldest` all return the same default (newest-first) order.

Because pagination is server-driven and the client only ever holds the pages it has
already scrolled, **the frontend cannot offer an honest "oldest first" sort** without
backend support. This document specifies the minimal backend change to unblock it.

## Goal use cases

1. **Browse a lecturer/category catalog oldest-first** (the primary request) —
   filters only, ascending date order.
2. **Search within a lecturer/category** — a text query constrained to a scope.
3. **Both, via one coherent contract** — the endpoint below supports either: empty
   `value` + filters = browse; `value` + filters = search-within-scope.

`searchApi.php` already accepts scope filters (`rp_id`, `cat_id`, `album_id`,
`lang_id`), so use case 2 is partially shippable today. Use case 1 needs the two
additions below.

## Minimal changes requested

Add to the listing endpoints (`leclisting_rp.php`, `genre_api.php`, and ideally
`searchApi.php` for parity):

1. **A date field on every list item** — e.g. `updated_date` or `created_at`
   (ISO 8601 preferred, e.g. `2020-04-16T13:51:00Z`). The detail endpoint
   (`leclistingapi.php`) already returns `updated_date`, so the data exists.
2. **An `order` query param** — `order=oldest` | `order=newest` (default
   `newest` to preserve current behaviour). Ordering must be applied
   **server-side across the full result set**, before pagination.

### Suggested request

```
GET /leclisting_rp.php?rpid=887&page=1&order=oldest
GET /genre_api.php?cat_id=40300&page=1&order=oldest
```

### Suggested response item (additive — existing fields unchanged)

```json
{
  "nid": 197044,
  "title": "Ramadan 1441 Tafseer day2 - Suratul Anfal ...",
  "updated_date": "2020-04-16T13:51:00Z",
  "...": "existing fields unchanged"
}
```

## Acceptance criteria

- `order=oldest` returns the **earliest** lectures on page 1, ascending by date,
  consistent across pages (no duplicates / gaps at page boundaries).
- Omitting `order` keeps today's newest-first behaviour (no breaking change).
- Every list item includes a parseable date field.

## Frontend follow-up once shipped

- Add a "Sort: Newest / Oldest" toggle on lecturer/category/album detail pages,
  wired to the `order` param (re-fetches from page 1 on change).
- Show the lecture date in list rows so users can scan by recency.

## Download note (related, separate backend ask)

While here: lecture audio on `media.dawahnigeria.com` is served with
`Content-Type: audio/mpeg` and **no `Content-Disposition: attachment`** header, and
the host sends no CORS headers. Result: on mobile the file **plays inline instead of
downloading**, and a client-side forced download (fetch→blob) is CORS-blocked. The
frontend now percent-encodes URLs (fixing broken old-lecture links) and uses an
anchor with `download`, but **truly forcing a save requires the media host to send
`Content-Disposition: attachment`** (or `download_api.php` to proxy the file with
that header). Please add it.
