# Leasewell

AI reads commercial leases and amendments, then lists the obligations that need action.

For commercial property and asset managers. Leasewell turns long lease packs into a dated action list, with the rent, renewal and notice clause beside each recommendation.

## Product workflow

- Buyer: Commercial property & asset managers
- Input: Leases, amendments and related rent documents
- AI output: A lease brief with dates, obligations and cited clauses
- Human action: Assign the lease action

It supports lease administration. Legal interpretation, contractual notices and commercial decisions require the appointed professional.

## Design

**Commercial property journal.** Editorial architecture opening → amendment story → lease abstract → property photography → obligation review → clause-processing stack → portfolio roadmap.

Heading: Instrument Serif. Body: DM Sans. Accent: #2a58ba.

Logo: An open arch meets a ledger baseline: the building and the lease in one quiet mark.

The standalone site contains 18 routed pages plus its 404 page, including team, contact, roadmap, privacy, data policy and responsible AI policy. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@leasewell.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Extract clause text, tables and schedules from lease packs and amendments. **Planned integration.**
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Retrieve the original clause and the later wording that may change it. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Prepare an obligation brief with cited clauses, dates and a human review action. **Connector implemented · configure Azure deployment.**
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep the reviewed document versions and lease brief together. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect PDF lease packs and amendment versions; build a reviewed obligation schema.
- **04. Reviewed field pilot — Planned:** Compare extracted dates, rent calculations and amendment precedence with an appointed lease professional’s review.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

75 hypothetical organizations × 45 lease packs per team / month × 1 review per changed pack × 140 pages per lease pack = **472,500 document pages per month**.

Each new pack requires a detailed read and cross-document check. Portfolio reviews repeat the work for changed agreements and approaching obligations.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode. Responsibility areas are described without inventing staff appointments. Contact links open a public product enquiry; the pilot form saves a local brief and sends no email.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.
