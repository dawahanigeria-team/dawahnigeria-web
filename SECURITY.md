# Security Policy

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security problems.**

Report vulnerabilities privately to **server@dawahnigeria.com**, or through
GitHub's [private vulnerability reporting](https://github.com/dawahanigeria-team/dawahnigeria-web/security/advisories/new)
on this repository.

Please include:

- What the issue is and where in the codebase it lives
- Steps to reproduce it, or a proof of concept
- What an attacker could do with it

### What to expect

<!-- These are the project's commitments to reporters. Adjust the windows to what
     the team can realistically honour before making the repository public. -->

- **Acknowledgement** within 3 working days
- **An assessment** (accepted / not applicable / needs more information) within 10 working days
- Updates at least every 14 days while we work on a fix
- Credit in the release notes once a fix ships, unless you would rather stay anonymous

## Scope

This repository holds the **web frontend only**. Reports about the following are
in scope:

- Cross-site scripting, injection, or unsafe rendering of API data
- Authentication or session handling flaws in the client
- Exposure of secrets or user data through the built bundle or source maps
- Dependency vulnerabilities that are actually reachable from this application

Out of scope:

- The backend API (`api.dawahnigeria.com`) and its data — report those to the
  same address, but note that this repository is not where they are fixed
- Media hosted on `media.dawahnigeria.com`
- Findings from automated scanners with no demonstrated impact
- Missing hardening headers on third-party domains we do not control

## Supported versions

Only the current `master` branch (what is live on dawahnigeria.com) receives
security fixes. Fixes land on `dev` first and are promoted to `master`. There are
no long-lived release branches.
