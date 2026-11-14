# Verification — AI product revision

## Automated checks

The revised build passed **14 automated test groups** covering all ten products and the optional server adapter:

- Sample register totals reconcile with the fixture records.
- Ten distinct marks, layouts and identity directions remain present, with local font and photo licensing.
- AI workload formulas reconcile with the published configuration.
- Every prepared finding cites a supplied source and quotes text that is actually present there.
- All 150 brand HTML pages have metadata, a single main heading and a sample-data disclosure.
- Local pages, styles, scripts, images and font references resolve.
- Standalone outputs match the published collection copies.
- The unconfigured AI adapter makes no provider request and reveals no key.
- Service authentication, allowed browser origins, input limits and image type checks are enforced.
- Repeated and overlapping identical requests share cached/in-flight work.
- Provider calls request bounded structured output and disable provider-side response storage with `store: false`.
- Invented source references and text quotations are rejected.

The existing Happy DOM runner passed **120 interaction groups** for login, register operations, search, status filtering, notes, completion/reopening, record creation, recalculated totals, CSV formula escaping, persistence, pricing, the workload planner, mobile-menu state and local pilot briefs.

The new AI runner passed **80 additional interaction groups** across the ten products. It checks prepared runs without network calls, exact citation highlighting, accepting reports for human review, downloads, alternate cases, report persistence, connected-mode usage and safe text rendering, and recovery from an unconfigured service.

Connected-provider responses in automated tests are mocked. **No paid model request or actual credit usage was claimed or incurred by these checks.** The optional server adapter requires the user's configured provider account before it can make a live call.

## Repeat the interaction checks

```sh
npm install --prefix /tmp/b2b-studio-qa --cache /tmp/b2b-studio-npm-cache happy-dom@20.8.4 --no-audit --no-fund
B2B_DOM_MODULE=/tmp/b2b-studio-qa/node_modules/happy-dom/lib/index.js node scripts/check-interactions.mjs
B2B_DOM_MODULE=/tmp/b2b-studio-qa/node_modules/happy-dom/lib/index.js node scripts/check-ai-interactions.mjs
```

Happy DOM is a simulation, not a real browser. Its decimal-step check is disabled in the fixture because it uses binary floating-point modulo; the application's own positive-value and maximum checks still run.

## Visual verification limit

The managed preview relay again failed to open browser port 4173. No substitute browser-control path was used. Responsive layouts and readable text sizes are implemented, but real-browser screenshots and viewport checks remain unverified.

## Publication

The primary destination is https://uniqkode.github.io/b2b-product-studio/ . The existing owner-private Sites copy is https://uniqkode-b2b-studio.oakcamellia2.chatgpt.site . The latest `live-check-results.json` records HTTPS status and SHA-256 comparisons for the published release.

Workload totals are explicit planning scenarios, not actual customers, usage, model accuracy, certifications or cloud-credit eligibility evidence. Prepared reports and professional limits remain visible in the product experience.
