# Verification — distinct websites and Azure roadmaps

## Local checks

The revision passed **20 automated test groups** across the ten websites and the optional AI adapter. The build creates **190 brand HTML pages** (18 routes and a 404 per product). Checks cover single main headings, working local references, reconciled sample totals, accurate workload formulas, source quotations, ten different page structures, thirty separate industry photos with attribution, real maintainer information, omitted unverified registrations, and product-specific roadmap/Azure statuses.

Backend checks cover authentication, explicit allowed origins, input limits, caching and shared in-flight requests, structured provider output and rejected invented quotations. Azure tests validate resource endpoints, deployment names, API-key and Microsoft Entra authentication, incomplete configuration handling, and health responses that omit credentials and resource details.

**206 DOM interaction groups passed:** 120 operational workspace/form groups; 80 evidence-review and connected-service boundary groups; six additional field-selector, intake-filter and document-library groups on home and product pages. Connected provider responses are mocked. No paid model call, cloud deployment or Azure credit use was performed by these tests.

## Repeat the checks

```sh
npm run build
npm test
B2B_DOM_MODULE=/tmp/b2b-studio-qa/node_modules/happy-dom/lib/index.js node scripts/check-interactions.mjs
B2B_DOM_MODULE=/tmp/b2b-studio-qa/node_modules/happy-dom/lib/index.js node scripts/check-ai-interactions.mjs
B2B_DOM_MODULE=/tmp/b2b-studio-qa/node_modules/happy-dom/lib/index.js node scripts/check-design-interactions.mjs
```

The DOM runners require Happy DOM (20.8.4 used here). Happy DOM simulates interactions and does not render visual layouts. Its decimal-step constraint is disabled only in the fixture because of its binary floating-point modulo behavior; the application’s positive-value and maximum checks still run.

## Visual verification limit

The managed preview relay failed to open browser port 4173. Its stopped state was confirmed, and no substitute browser-control path was used. Responsive styles and larger text are implemented, but real-browser viewport screenshots remain unverified.

## Publication verification

Public destination: https://uniqkode.github.io/b2b-product-studio/ . The existing owner-private Sites copy preserves its current access at https://uniqkode-b2b-studio.oakcamellia2.chatgpt.site .

After publication, `python scripts/check-live.py` compares every brand page and fourteen key assets per product by HTTPS status and SHA-256. The current release evidence is recorded in `qa/live-check-results.json` and the release note below.

Workload estimates remain planning assumptions. Azure OpenAI connector code is implemented; real deployment, sector integration, pilots, telemetry and production accounts remain the appropriate next stages. No generic RC number, invented staff, customer endorsement or deployed Azure consumption is published.
