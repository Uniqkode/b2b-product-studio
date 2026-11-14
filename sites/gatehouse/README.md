# Gatehouse

AI reads contractor documents and flags missing or expired evidence for a reviewer.

For industrial workplaces and facilities teams. Gatehouse compares training certificates, insurance schedules and work-permit requirements, then explains what is missing before a contractor starts a job.

## Product workflow

- Buyer: Industrial workplaces & facilities teams
- Input: Training certificates, insurance schedules and job requirements
- AI output: A contractor checklist with missing or conflicting evidence
- Human action: Request the missing evidence

It checks supplied documents. It does not authenticate a certificate, identify a person or independently authorize workplace access.

## Design

**Contractor assurance dossier.** Contractor dossier opening → worksite portrait spread → document pass → requirement checklist → evidence review → Azure reading stack → approval-stage roadmap.

Heading: Fraunces. Body: Manrope. Accent: #be403f.

Logo: A doorway cut from a G creates a welcoming entrance with a clear boundary.

The standalone site contains 18 routed pages plus its 404 page, including team, contact, roadmap, privacy, data policy and responsible AI policy. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@gatehouse.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Read training certificates, insurance schedules and work-permit evidence supplied for the job. **Planned integration.**
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Find the requirement and the document passage that does or does not address it. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Compare dates and scope, then explain the missing evidence without authenticating a certificate. **Connector implemented · configure Azure deployment.**
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Retain reviewed document versions under the contractor job pack. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect document intake, job requirements and expiry-date extraction; implement restricted evidence access.
- **04. Reviewed field pilot — Planned:** Have appointed workplace reviewers check whether the proposed gaps match the job requirements and submitted documents.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

48 hypothetical organizations × 120 contractor packs per team × 2 new or changed reviews / month × 18 pages per contractor pack = **207,360 document pages per month**.

New jobs and expiring documents create repeated reading and comparison work. The scope is contractor evidence, rather than a low-volume visitor register.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode. Responsibility areas are described without inventing staff appointments. Contact links open a public product enquiry; the pilot form saves a local brief and sends no email.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.
