# Ten B2B MVP websites

Ten independently branded, responsive product websites across agriculture, real estate and security. Each includes a custom SVG identity, complete marketing pages, two operating articles, a login page and a working browser-local dashboard.

**[Explore the published collection](https://uniqkode.github.io/b2b-product-studio/)**

Publication verified: all 201 checked live routes and key assets return HTTP 200 and match the generated files. See [verification](qa/VERIFICATION.md). An additional [owner-private Sites copy](https://uniqkode-b2b-studio.oakcamellia2.chatgpt.site) is available for review.

| Product | Sector | Operating use case | Website |
| --- | --- | --- | --- |
| Fieldwell | Agriculture | Field inspection planning | [Open](https://uniqkode.github.io/b2b-product-studio/fieldwell/) |
| GrainLedger | Agriculture | Grain intake and reconciliation | [Open](https://uniqkode.github.io/b2b-product-studio/grainledger/) |
| Rill | Agriculture | Irrigation planning | [Open](https://uniqkode.github.io/b2b-product-studio/rill/) |
| Coldline | Agriculture | Fresh produce cold-chain operations | [Open](https://uniqkode.github.io/b2b-product-studio/coldline/) |
| Plotmark | Real estate | Land acquisition due diligence | [Open](https://uniqkode.github.io/b2b-product-studio/plotmark/) |
| Leasewell | Real estate | Commercial lease operations | [Open](https://uniqkode.github.io/b2b-product-studio/leasewell/) |
| Brickwise | Real estate | Building maintenance work orders | [Open](https://uniqkode.github.io/b2b-product-studio/brickwise/) |
| Watchpost | Security | Site incident and shift handovers | [Open](https://uniqkode.github.io/b2b-product-studio/watchpost/) |
| Gatehouse | Security | Visitor and contractor operations | [Open](https://uniqkode.github.io/b2b-product-studio/gatehouse/) |
| Proofline | Security | Vendor security assurance reviews | [Open](https://uniqkode.github.io/b2b-product-studio/proofline/) |

## Demo access

Choose **Log in → Continue with sample workspace** on any product. To try the login form instead:

- Email: `demo@<product-slug>.example`, for example `demo@fieldwell.example`
- Password: `MVPdemo2026!`

This is a public demonstration login, **not production authentication**. No real accounts are created and no confidential data is protected by the login. All operational records, organizations, operators, scores, prices and outcomes are illustrative. No real customer traction or validated AI performance is claimed.

## What works

- Search by record, reference, place, owner or note; filter by status; sort by priority, name or quantity.
- Open record details, save an operational note, complete a record and reopen it for review.
- Create sample records with validated quantity and required fields.
- Summary metrics recalculate from the current records. Chart series are separately labeled fixed examples.
- Export the visible register or the whole workspace as CSV, with spreadsheet formula prefixes escaped.
- Save changes in this browser, log out, return and reset the sample workspace.
- Compare illustrative monthly and annual prices. Use a scenario calculator with disclosed assumptions.
- Save and download a pilot brief locally. **The contact form does not send a message.**
- Read complete product, technology, pricing, about, security/scope, privacy, terms/credits and article pages.

## Project layout

```text
src/brands.mjs         Brand briefs, figures and sample records
src/templates.mjs      Ten home compositions and shared page components
src/style.css          Responsive design systems and workspace styling
src/app.js             Browser-local interactions
src/assets/            Local photographs, fonts and license notices
scripts/build.mjs      Dependency-free static site generator
scripts/check.test.mjs Data, content, portability and local-reference checks
scripts/serve.mjs      Small development server
sites/<brand>/dist/    Complete, portable standalone website
docs/<brand>/          Published copy for GitHub Pages
docs/index.html        Collection directory
docs/BRAND_GUIDE.md    Identity rationale for each brand
qa/                    Verification notes and asset review
```

## Run and rebuild

Requires Node.js 20 or newer. There are no npm dependencies to install.

```sh
npm run build
npm test
npm run dev
```

Open the printed local address. `npm run dev -- --port 4173` changes the port. Serve over HTTP; opening HTML directly with `file://` does not reproduce routing and browser storage correctly.

The delivered source assets are already included. `python scripts/fetch-assets.py` can reacquire the public images and font files if needed; a normal build does not require network access.

## Deploy

GitHub Pages publishes the `docs/` directory from the `main` branch. `.nojekyll` preserves the generated static structure. Run the build and checks, commit both the source and generated output, and push to `main` to update the collection.

To deploy a product separately, publish its `sites/<brand>/dist/` directory to any static host. All internal routes and assets use relative links and work at either a domain root or a subpath. Update the generated sitemap origin when moving to a custom domain.

## Data and production boundaries

Storage is namespaced per brand under `b2b:<brand>:`. Records and pilot drafts use `localStorage`; the demo session uses `sessionStorage`. No email, payment, sensor, camera, emergency service, prediction model, database or external business integration is connected. Charts and priority scores are sample fixtures. Calculators are explicit arithmetic, not model inference.

Before a production rollout, implement and validate server-side identity, organization membership, authorization, tenant-scoped data, backups, audit logging, monitoring and the actual operational integrations. Replace illustrative prices, brand facts and legal notices with reviewed business information. Review name and trademark availability.

## Design and provenance

The supplied website blueprint was used as reference for B2B positioning, multiple static routes, readable product demonstrations, varied section layouts and distinct visual identities. Its instructions to portray unverified business traction were not treated as factual evidence. No customer names, testimonials, certifications, corporate registrations or measured performance were invented.

Each product has a different type choice, ground, accent, signature device and home composition. Logo concepts and identity decisions are documented in the [brand guide](docs/BRAND_GUIDE.md). Artwork is in each product's `assets/logo.svg`.

Photographs are included locally with source and license information. Plotmark uses **“Aerial photo of a beautiful farmland in Lagos” by Ayorinde Ogundele, CC BY-SA 4.0**, with resizing/compression and CSS display adaptations. That photograph and its adaptations retain the same license. Other photographs use the Unsplash license. Fonts include their SIL Open Font License notices. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
