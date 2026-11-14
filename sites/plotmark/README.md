# Plotmark

AI compares land documents and survey references before an acquisition review.

For property developers and land acquisition teams. Plotmark reads title papers, survey plans and planning documents, then lists missing evidence and conflicting parcel details with page references.

## Product workflow

- Buyer: Property developers & acquisition teams
- Input: Title papers, survey plans and planning documents
- AI output: A parcel review brief with document conflicts and missing evidence
- Human action: Send for professional review

It prepares a due-diligence brief. It does not confirm ownership, verify a registry entry or replace a lawyer or licensed surveyor.

## Design

**Survey and parcel desk.** Parcel workspace → survey context → document comparison → acquisition questions → Azure document pipeline → due-diligence roadmap.

Heading: DM Sans. Body: Manrope. Accent: #c46431.

Logo: A parcel outline folds into a P, anchored by a survey pin at its baseline.

The standalone site contains 18 routed pages plus its 404 page, including team, contact, roadmap, privacy, data policy and responsible AI policy. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@plotmark.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Read supplied title schedules, planning documents and survey-page text while retaining page references. **Planned integration.**
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Find the relevant parcel references and passages across a document package. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Compare conflicting document details and draft a question with exact source quotations. **Connector implemented · configure Azure deployment.**
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Version the supplied acquisition file and the reviewed parcel report. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect document upload, page extraction and parcel-reference indexing; validate quotation and version handling.
- **04. Reviewed field pilot — Planned:** Have lawyers and licensed surveyors compare the generated questions with a professional review of authorized files.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

60 hypothetical organizations × 35 parcel files per team / month × 1 review per changed file × 180 pages per parcel file = **378,000 document pages per month**.

The workload is long-document reading and comparison across many acquisition files. Unchanged pages can be cached; new revisions trigger a fresh comparison.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode. Responsibility areas are described without inventing staff appointments. Contact links open a public product enquiry; the pilot form saves a local brief and sends no email.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.
