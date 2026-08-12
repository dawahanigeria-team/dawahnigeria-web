# Contributing to Dawahnig Live

Thank you for considering a contribution. This repository is the **web frontend**
for [dawahnigeria.com](https://dawahnigeria.com) — a React application that reads
from the Dawah Nigeria API. The API and the lecture content itself live elsewhere
and are not part of this repository.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before taking part, and our
[Security Policy](SECURITY.md) if you have found a vulnerability (do not open a
public issue for those).

## Getting set up

You will need **Node.js 18+** and **Yarn 1.x**. The project enforces Yarn — `npm
install` will refuse to run.

```bash
git clone https://github.com/dawahanigeria-team/dawahnig-live.git
cd dawahnig-live
yarn install
cp .env.example .env
yarn start
```

The app runs at http://localhost:3000.

### You must use port 3000

The API's CORS allowlist contains **`http://localhost:3000` exactly**. Any other
port — and even `http://127.0.0.1:3000` — is rejected, and every request will
fail in the browser with a CORS error while the page shell still renders. If you
see "Unable to establish connection to server" and empty content, check your
port before anything else.

### About the API

`.env.example` points at the live production API. It is read-only for the
endpoints this app uses, so you can develop against it, but please avoid
hammering it — cache locally where you can, and never commit an `.env` file.

If a change you are making needs API behaviour that does not exist yet, open an
issue first rather than working around it in the client.

## Branching and pull requests

The default branch is **`dev`**, and that is where contributions go. Branch from
`dev` and open your pull request against `dev` — not against `master`.

`master` is the production branch: every push to it deploys straight to the live
site. Maintainers promote `dev` to `master` once changes have been checked on the
development deployment.

Use a descriptive branch name — for example `fix/player-seek-on-mobile` or
`feat/lecturer-filter-chips`.

Before you open a pull request:

- [ ] `yarn build` completes without errors
- [ ] `yarn test` passes
- [ ] You have checked the change in a browser at both mobile and desktop widths
- [ ] No secrets, `.env` files, or API keys are included in the diff
- [ ] Commit messages describe the change, not the file that changed

Pull requests run an automated build and test check. Fork pull requests
deliberately have no access to repository secrets, so deployment workflows will
not run on them — that is expected.

## Code style

- Prettier config is in `.prettierrc`; match the existing formatting
- Tailwind for styling. **Arbitrary variants such as `min-[690px]:` do not
  compile in this project** — the `screens` config in `tailwind.config.js`
  contains an object value, which makes Tailwind silently drop them. Use a named
  screen instead. There are pre-existing classes in the codebase that are dead
  for this reason; do not copy the pattern.
- Keep components in the folder structure already in `src/` rather than
  introducing a new layout

## What makes a good first contribution

Bug fixes, accessibility improvements, and responsive layout fixes are always
welcome and easy to review. If you want to change architecture, routing, or add
a dependency, please open an issue to discuss it first.

## Reporting bugs and requesting features

Use the issue templates. A bug report with the URL, the browser, and a
screenshot or short recording is worth far more than one without.
