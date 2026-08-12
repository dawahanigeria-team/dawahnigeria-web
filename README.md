# Dawahnig Live

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

The web frontend for [dawahnigeria.com](https://dawahnigeria.com) — a React
application for discovering and listening to Islamic lectures.

This repository contains **the frontend only**. The API it reads from, and the
lecture audio itself, are not part of this repository.

## Tech stack

- [React 19](https://react.dev/) with [Create React App](https://create-react-app.dev/) (`react-scripts` 5)
- [Redux](https://redux.js.org/) with `redux-persist` for state
- [React Router 7](https://reactrouter.com/) for routing
- [TanStack Query](https://tanstack.com/query) for server state
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Sentry, PostHog and Tawk.to for monitoring, analytics and support chat

## Getting started

You need **Node.js 18+** and **Yarn 1.x**. The project enforces Yarn — `npm install`
will refuse to run.

```bash
git clone https://github.com/dawahanigeria-team/dawahnig-live.git
cd dawahnig-live
yarn install
cp .env.example .env
yarn start
```

The development server runs at http://localhost:3000.

`.env.example` points at the live production API, which is read-only for the
endpoints this app uses. Copy it as-is to get running; the analytics and error
reporting keys are optional and the app works without them.

### Available scripts

| Command | What it does |
| --- | --- |
| `yarn start` | Start the development server on port 3000 |
| `yarn build` | Build the production bundle into `build/` |
| `yarn test` | Run the Jest test suite |

To preview a production build locally:

```bash
yarn build
npx serve -s build
```

## Project structure

```
src/
  assets/       Images, fonts and static media
  components/   Shared UI components
  pages/        Route-level components
  Redux/        Store, actions and reducers
  hooks/        Custom React hooks
  services/     API clients and auth/token handling
  utils/        Helpers (formatting, downloads, analytics)
lambda-edge/    Lambda@Edge function that injects Open Graph tags at CloudFront
public/         Static files copied verbatim into the build
```

## How SEO and link previews work

This is a client-rendered single-page app, so social media crawlers and search
engines would normally see an empty shell. Instead of server-rendering, a
**Lambda@Edge function** (`lambda-edge/og-tags-injector.js`) runs at the
CloudFront edge and injects per-page Open Graph tags and JSON-LD structured data
into the HTML for bot requests. See [lambda-edge/README.md](lambda-edge/README.md)
for how it is deployed.

## Deployment

Production and staging are static builds deployed to **Amazon S3** and served
through **CloudFront**, driven by the workflows in `.github/workflows/`:

| Workflow | Trigger | Target |
| --- | --- | --- |
| `main.yml` | push to `master` | Production |
| `staging-ci-cd.yml` | push to `staging` | Staging |
| `dev-ci.yml` | push to `dev` | Development |
| `pr-ci.yml` | pull requests | Build and test only, no deployment |

All build-time configuration comes from GitHub Actions secrets. Pull requests
from forks intentionally have no access to those secrets, so `pr-ci.yml` builds
using `.env.example` only.

> **Note:** an experimental server-side rendered deployment exists on the
> `yusuf/hosting-ssr` branch (`deploy.yml`, Express + pm2 on a VPS). It is not
> part of `master`, and the Express server and its scripts are not in this
> branch.

## Contributing

Contributions are welcome. Please read:

- [CONTRIBUTING.md](CONTRIBUTING.md) — setup, branching, and what to check before opening a PR
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — how we expect people to treat each other
- [SECURITY.md](SECURITY.md) — how to report a vulnerability (please do not open a public issue)

The default branch is `master`.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).

The license covers the source code in this repository. It does **not** grant any
rights to the Dawah Nigeria name or logo, or to the lecture content served by the
application.
