# Ten focused B2B AI products

**[Explore the published websites](https://uniqkode.github.io/b2b-product-studio/)** · [Product ideas and workload assumptions](docs/AI_PRODUCTS.md) · [Brand guide](docs/BRAND_GUIDE.md)

Ten independently branded products for agriculture, real estate and security. Each website explains the buyer, input, AI output and human decision, then lets a visitor try a source-linked review workflow. Headlines use plain language. Typography and product screens have been redesigned around reading and doing the work.

| Product | The AI job |
| --- | --- |
| [Fieldwell](https://uniqkode.github.io/b2b-product-studio/fieldwell/) | Review crop photos and prepare an inspection list. |
| [GrainLedger](https://uniqkode.github.io/b2b-product-studio/grainledger/) | Check grain sample photos and reconcile intake documents. |
| [Rill](https://uniqkode.github.io/b2b-product-studio/rill/) | Forecast zone water demand for an irrigation decision. |
| [Coldline](https://uniqkode.github.io/b2b-product-studio/coldline/) | Review produce images and temperature histories for condition warnings. |
| [Plotmark](https://uniqkode.github.io/b2b-product-studio/plotmark/) | Compare land documents and cite the unanswered due-diligence questions. |
| [Leasewell](https://uniqkode.github.io/b2b-product-studio/leasewell/) | Read leases and amendments and identify obligations that need action. |
| [Brickwise](https://uniqkode.github.io/b2b-product-studio/brickwise/) | Group building inspection findings and draft a repair list. |
| [Watchpost](https://uniqkode.github.io/b2b-product-studio/watchpost/) | Review defined video events and prepare timestamped evidence for supervisors. |
| [Gatehouse](https://uniqkode.github.io/b2b-product-studio/gatehouse/) | Compare contractor evidence with job requirements and flag gaps. |
| [Proofline](https://uniqkode.github.io/b2b-product-studio/proofline/) | Match vendor security answers to supporting document passages. |

## What works in the websites

- Choose between two prepared cases, run the review and inspect each source citation.
- See exact source text highlighted when a finding is selected.
- Accept a report for human review, retain it in the current browser and download it with its evidence.
- Restore accepted reports in the dashboard's Reports view.
- Search, filter, sort, create and update the operational register; save notes; complete and reopen records; export CSV with formula prefixes escaped.
- Compare illustrative monthly and annual pricing and adjust a workload scenario using explicit arithmetic.
- Save and download a local pilot brief. The contact form sends no email.
- Read complete product, technology, company, security/scope, legal and product-specific editorial pages.

## Real AI connection

The repository also contains a [Node AI adapter](server/README.md) that calls the OpenAI Responses API with test text and optional images. It uses structured output, checks text quotations against their stated sources, reports provider usage, caches repeated requests and keeps the provider key on the server.

No AI account is connected by default. The public websites use **prepared results**, clearly labeled. A connected analysis requires your own configured server and incurs that provider account's normal usage. GitHub Pages cannot run this server or keep an API key secret. No actual model call or credit spend is claimed by the workload examples.

```sh
npm run api
```

Set `OPENAI_API_KEY` in the server environment before using connected analysis. Configuration, remote-service authentication, limits and the request contract are documented in `server/README.md`. Production video sampling, sensor ingestion, OCR and shared tenant data still require integration and evaluation.

## Run and build

Node.js 20 or newer is required. Website generation has no npm dependencies.

```sh
npm run build
npm test
npm run dev
```

The static server accepts `--port` and `--host`. Normal builds use the local images and fonts already in the repository and require no asset downloads.

## Demo access

Use `demo@<product-slug>.example`, for example `demo@fieldwell.example`, with password `MVPdemo2026!`, or select the one-click sample workspace.

These are public demo credentials, not production authentication. No verified account is created. Records, reports and pilot briefs use brand-specific `localStorage` keys; the demo session uses `sessionStorage`. Reset clears this brand's stored data in this browser. Use non-sensitive test information.

## Structure and hosting

```text
src/ai-briefs.mjs         Ten AI use cases, prepared evidence and workload assumptions
src/ai-pages.mjs          Product-led marketing pages and review workspace markup
src/ai-workspace.js       Prepared and connected analysis interactions
src/product.css           Revised typography, identity covers and readable UI
src/templates.mjs         Page shell, login, register, pricing and legal pages
src/app.js                Demo access, register actions and local forms
src/assets/              Local licensed photography, fonts and notices
server/                  Optional configured AI provider adapter and tests
scripts/                 Build, integration checks and guide generation
sites/<brand>/dist/      Complete standalone static websites
sites/<brand>/README.md  Individual product handover
docs/<brand>/           GitHub Pages outputs
docs/index.html         Published product directory
qa/                      Verification results
```

GitHub Pages serves `main:/docs`. Build, check and commit source plus generated output to update it. Each `sites/<brand>/dist/` folder is portable to a static host; update the sitemap origin if moving it to another domain. The owner-private Sites copy retains its existing access at https://uniqkode-b2b-studio.oakcamellia2.chatgpt.site .

## Honest scope

All operational fixtures, organizations, prices, workloads and example outcomes are illustrative. Workload formulas describe hypothetical deployments and reconcile across pages. They are not customer traction, measured results, verified certifications, registered entities or cloud-credit eligibility claims. No endorsements or company registration details have been borrowed from unrelated businesses.

The original SVG marks are included. Photography remains licensed and locally hosted; no generated people or customer imagery is used. Font copyright and open font licenses are included. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

See [QA notes](qa/VERIFICATION.md) for automated checks and the remaining visual-browser verification limit.
