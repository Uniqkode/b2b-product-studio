# Brickwise

AI reviews building inspection images and notes, then drafts an evidence-linked repair list.

For facility managers and building maintenance teams. Brickwise groups repeated defects in photos, reads technician notes and suggests which issues need a qualified inspection first.

## Product workflow

- Buyer: Facility managers & building operators
- Input: Inspection photos, thermal images and technician notes
- AI output: A grouped defect list and draft work orders
- Human action: Create the reviewed work order

An image cannot certify structural or equipment safety. A qualified professional inspects the condition and approves the work.

## Design

**Maintenance operating board.** Industrial work-order opening → annotated building image → maintenance board → technician detail → inspection review → vision processing stack → asset rollout.

Heading: Barlow Condensed. Body: Manrope. Accent: #e9ae29.

Logo: Offset masonry units build a B with an open service passage through the center.

The standalone site contains 18 routed pages plus its 404 page, including team, contact, roadmap, privacy, data policy and responsible AI policy. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@brickwise.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep inspection and follow-up images under a stable building and asset reference. **Planned integration.**
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Run a trained inspection model over new images and group repeated candidate defects. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Combine image observations and technician notes into a draft repair list. **Connector implemented · configure Azure deployment.**
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions): Queue site inspections, track failures and avoid duplicate work orders for the same reviewed issue. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect asset-labelled photo uploads and technician notes; evaluate defect grouping before creating operational work orders.
- **04. Reviewed field pilot — Planned:** Have qualified technicians review proposed defects and measure duplicate reports, missed defects and repair follow-ups.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

65 hypothetical organizations × 12 buildings per operator × 2 surveys per building / month × 180 images per survey = **280,800 inspection images per month**.

The model reviews fresh inspection imagery across a property portfolio and compares follow-up photos with the original defect record.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode. Responsibility areas are described without inventing staff appointments. Contact links open a public product enquiry; the pilot form saves a local brief and sends no email.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.
