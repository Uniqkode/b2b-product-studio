# Proofline

AI compares supplier security documents with your questions and cites the answers.

For procurement and information-security teams. Proofline reads policies, questionnaires and supporting reports, then drafts a review showing what is supported, unclear or still missing.

## Product workflow

- Buyer: Procurement & information-security teams
- Input: Vendor policies, questionnaires and supporting reports
- AI output: A cited security review with unanswered evidence requests
- Human action: Send the evidence request

A drafted answer is not an assurance opinion or certification. A qualified reviewer decides whether the evidence is sufficient.

## Design

**Vendor evidence workspace.** Evidence review interface → policy/question comparison → document library → evidence gaps → security context → Azure retrieval stack → assurance roadmap.

Heading: IBM Plex Sans. Body: IBM Plex Sans. Accent: #116f68.

Logo: A continuous P-shaped evidence line ends in a small verified square, without implying certification.

The standalone site contains 24 routed pages (including home/technology aliases) plus its 404 page. Problem, solution, market and combined legal pages join the team, contact, roadmap and policy pages. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@proofline.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Read policies, questionnaires and supporting reports with page and section references. **Planned integration.**
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Find relevant policy passages using exact terms and meaning-based retrieval. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Draft cited answers and explain unclear scope or contradictory evidence. **Connector implemented · configure Azure deployment.**
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Version the supplier evidence pack and the accepted review brief. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect evidence upload and document indexing; evaluate answer scope and citation accuracy.
- **04. Reviewed field pilot — Planned:** Have security reviewers compare drafted answers with the source policies and measure unsupported or missed evidence.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

60 hypothetical organizations × 40 vendor reviews per team / month × 1 read per new or changed pack × 160 pages per vendor pack = **384,000 document pages per month**.

The scenario contains 384,000 pages per month. At an illustrative 500 input tokens per page, that is 192 million input tokens before answers, retries or additional review passes.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode, with a short implementation bio. The enquiry form prepares a message for review and final submission on GitHub, or through a verified email when configured. A separate local project brief can be saved and downloaded.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.

## Interactive product tools

Check whether the passage covers the question. Choose the required account scope and compare it with the supplied policy extract. This is a guided evidence example, not a security certification.

The value planner compares your own review-time assumptions and exports the plan. Buyer tabs explain the segments, the solution tour steps through the workflow, and infrastructure tabs explain each service’s job. The homepage also includes a product-specific Why now, outcome measures, market strategy, software progress and three commercial plan tiers.

## Independent AI service and deployment

This kit includes its own `service/ai-service.mjs`, product definition and provider configuration. With Node 20+, run `npm run api` from this kit after configuring server-side provider credentials. The adapter accepts only Proofline requests. See `deployment/README.md` for the Azure Static Web Apps workflow and custom-domain setup; the model service deploys separately.

Company, domain, contact and booking fields are controlled in the complete repository’s [OWNER_SETUP.md](../../OWNER_SETUP.md). Unverified values remain unpublished.
