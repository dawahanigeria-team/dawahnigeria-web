// Helpers for downloading lecture audio files.
//
// Two real-world problems these address (see investigation 2026-06-01):
//  1. Legacy lecture URLs come back from the API with raw spaces and other
//     unsafe characters (e.g. ".../Shaykh Auwal Maishago (Zaria)/Backlog 1439/...").
//     Passing those straight to window.open / an anchor breaks on stricter
//     browsers, which is why *old* lectures fail to download most often.
//  2. The media host (media.dawahnigeria.com) is cross-origin and does not send
//     `Content-Disposition: attachment`, so browsers play the file inline instead
//     of saving it. Forcing a true download from the client is therefore not
//     reliably possible without a backend header change; we do the best the
//     browser allows (anchor with `download`) and fall back gracefully.

/**
 * Percent-encode a file URL that may contain raw spaces / unsafe characters,
 * without double-encoding URLs that are already encoded.
 */
export const safeFileUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  const trimmed = url.trim();
  try {
    // If decoding is a no-op, the URL is unencoded -> encode it.
    // If decoding changes it, it's already (at least partly) encoded -> leave as-is.
    return decodeURI(trimmed) === trimmed ? encodeURI(trimmed) : trimmed;
  } catch {
    // Malformed escape sequence; encoding from scratch is the safer bet.
    return encodeURI(trimmed);
  }
};

/**
 * Trigger a download for the given file URL.
 * Uses an anchor click (better than window.open: not blocked by popup blockers,
 * and honours the `download` attribute for same-origin / CORS-enabled hosts).
 * Returns true if a navigation was triggered, false if the URL was unusable.
 */
export const triggerFileDownload = (fileUrl, suggestedName) => {
  if (typeof window === "undefined") return false;
  const href = safeFileUrl(fileUrl);
  if (!href) return false;

  const link = document.createElement("a");
  link.href = href;
  link.rel = "noopener noreferrer";
  link.target = "_blank";
  if (suggestedName) link.download = suggestedName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};
