# Fieldwell

AI checks field photos and shows agronomists where to inspect next.

For commercial growers and agronomy teams. Fieldwell compares drone and scouting photos, marks signs of crop stress, and turns each survey into a field-by-field inspection report.

## Product workflow

- Buyer: Commercial growers & agronomy teams
- Input: Drone surveys and scouting photos
- AI output: A crop-risk map and inspection list
- Human action: Assign an inspection

It supports scouting. A photograph alone cannot confirm disease, nutrient deficiency or a treatment.

## Design

**Field atlas.** Landscape opening → field map → scouting photography → survey report → Azure batch path → seasonal roadmap.

Heading: DM Serif Display. Body: DM Sans. Accent: #086b50.

Logo: Three cultivated rows bend into an F; an open seed shape leaves room for growth.

The standalone site contains 18 routed pages plus its 404 page, including team, contact, roadmap, privacy, data policy and responsible AI policy. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@fieldwell.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep original drone images, field references and dated survey files together. **Planned integration.**
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Run batches of crop-image checks on a trained vision model; compare the same field across survey dates. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Turn grouped image observations and scout notes into a plain-language inspection brief. **Connector implemented · configure Azure deployment.**
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions): Queue new surveys and retry failed work without reprocessing an unchanged survey. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect drone survey uploads and field boundaries; evaluate a crop-specific vision model against labelled observations.
- **04. Reviewed field pilot — Planned:** Have agronomists review flagged areas against field inspections and track missed and duplicate observations.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

72 hypothetical organizations × 20 fields per organization × 2 surveys per field / month × 240 photos per survey = **691,200 image reviews per month**.

Fresh survey imagery arrives throughout the season. The AI must compare many images before it can produce one useful field report.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode. Responsibility areas are described without inventing staff appointments. Contact links open a public product enquiry; the pilot form saves a local brief and sends no email.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.
