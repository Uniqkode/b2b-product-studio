# GrainLedger

AI reviews grain photos and intake documents before a lot is released.

For grain aggregators and warehouse quality teams. GrainLedger checks standardized grain photos, reads weight and moisture records, and flags lots that need a human quality check.

## Product workflow

- Buyer: Grain aggregators & warehouse quality teams
- Input: Grain photos, scale tickets and moisture sheets
- AI output: A lot-quality report with discrepancies highlighted
- Human action: Record quality decision

Visual grading is a screening step. A warehouse specialist confirms the grade, sampling method and test results.

## Design

**Warehouse ledger.** Ledger masthead → intake book → warehouse photo spread → weight comparison → quality desk → processing stack → rollout ledger.

Heading: IBM Plex Sans. Body: Manrope. Accent: #e6a92e.

Logo: Interlocking G and L strokes form a warehouse tally with three grain bars.

The standalone site contains 24 routed pages (including home/technology aliases) plus its 404 page. Problem, solution, market and combined legal pages join the team, contact, roadmap and policy pages. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@grainledger.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Extract lot references, net weights and moisture observations from intake paperwork. **Planned integration.**
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Inspect standardized grain photos for candidate broken-kernel, discoloration or foreign-material observations. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Compare extracted readings and explain the discrepancy for the warehouse quality manager. **Connector implemented · configure Azure deployment.**
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Retain the source ticket, sample photo and reviewed intake report under the lot reference. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect scale-ticket and moisture-sheet ingestion; build a standardized grain-photo evaluation dataset.
- **04. Reviewed field pilot — Planned:** Compare visual flags with physical grading tests and verify that intake discrepancies cite the correct tickets.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

64 hypothetical organizations × 18 deliveries per warehouse / day × 26 receiving days / month × 12 photos and pages per delivery = **359,424 photo & page reviews per month**.

Daily truck arrivals create a repeated visual-inspection and document-reading workload, rather than a one-off chatbot conversation.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode, with a short implementation bio. The enquiry form prepares a message for review and final submission on GitHub, or through a verified email when configured. A separate local project brief can be saved and downloaded.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.

## Interactive product tools

Check the ticket difference. Enter a dispatch weight and receiving weight. The arithmetic identifies the difference; a quality manager decides what it means.

The value planner compares your own review-time assumptions and exports the plan. Buyer tabs explain the segments, the solution tour steps through the workflow, and infrastructure tabs explain each service’s job. The homepage also includes a product-specific Why now, outcome measures, market strategy, software progress and three commercial plan tiers.

## Independent AI service and deployment

This kit includes its own `service/ai-service.mjs`, product definition and provider configuration. With Node 20+, run `npm run api` from this kit after configuring server-side provider credentials. The adapter accepts only GrainLedger requests. See `deployment/README.md` for the Azure Static Web Apps workflow and custom-domain setup; the model service deploys separately.

Company, domain, contact and booking fields are controlled in the complete repository’s [OWNER_SETUP.md](../../OWNER_SETUP.md). Unverified values remain unpublished.
