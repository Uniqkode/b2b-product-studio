# Ten focused B2B AI products

**[Explore the published websites](https://uniqkode.github.io/b2b-product-studio/)** · [Product ideas and workload assumptions](docs/AI_PRODUCTS.md) · [Brand guide](docs/BRAND_GUIDE.md)

Ten independently branded products for agriculture, real estate and security. Each has its own layout and reading flow: a field atlas, grain ledger, irrigation planner, cold-chain journey, parcel desk, property journal, maintenance board, command desk, contractor dossier or evidence workspace. Thirty locally hosted industry photographs, readable fonts and original SVG marks support the product stories. Visitors can try a source-linked review workflow.

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
- Read product-specific Azure service roles, company/team and contact pages, privacy/data/AI policies and a five-stage development roadmap.
- Inspect 18 routed pages plus a 404 page in each independent website, 190 brand pages altogether.

## Real AI connection

The repository contains a [Node AI adapter](server/README.md) for **Azure OpenAI** and OpenAI Responses APIs with text and optional images. The Azure connector accepts a resource endpoint and deployment name with server-side API-key or Microsoft Entra-token authentication. It uses structured output, checks source quotations, reports usage and caches repeated requests.

No AI account is connected by default. The public websites use **prepared results**, clearly labeled. A connected analysis requires your own configured server and incurs that provider account's normal usage. GitHub Pages cannot run this server or keep an API key secret. No actual model call or credit spend is claimed by the workload examples.

```sh
npm run api
```

For Azure, set `AI_PROVIDER=azure`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` and server credentials as documented in [server/README.md](server/README.md) and [.env.azure.example](.env.azure.example). For OpenAI, set `AI_PROVIDER=openai` and `OPENAI_API_KEY`. Sector ingestion, Document Intelligence, Search, IoT, trained vision/forecast models, storage and production accounts remain integration work, with their roles and status shown on each technology page.

## Roadmaps and company details

Each roadmap shows five stages: **product foundation — built; Azure model connection — ready to configure; sector integration — planned; reviewed pilot — planned; production operations — planned.** The integration and pilot descriptions are specific to each product. See [all development stages](docs/DEVELOPMENT.md).

Company pages use the product brand name and identify the public project maintainer, Precious Arinze / Uniqkode. Contact links open a public repository enquiry, and the pilot brief remains a local draft. No private business email, address or additional staff appointment has been invented.

[src/company-profiles.json](src/company-profiles.json) holds legal/company settings. A legal name and RC number are published only when genuine registration details and an evidence reference have been supplied with `registrationVerified: true`. Unverified or generic registration numbers remain unpublished.

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
src/bespoke-pages.mjs     Ten distinct homepage/product compositions and Azure pages
src/company-pages.mjs     Company, team, contact, policies and roadmap pages
src/product-plans.mjs     Product-specific Azure roles and development stages
src/company-profiles.json Verified public maintainer and editable company settings
src/ai-pages.mjs          Shared evidence review tools and product directory
src/ai-workspace.js       Prepared and connected analysis interactions
src/product.css           Revised typography, identity covers and readable UI
src/brand-designs.css     Distinct layouts, photography and responsive design
src/brand-interactions.js Field selection, intake filter and evidence library
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
