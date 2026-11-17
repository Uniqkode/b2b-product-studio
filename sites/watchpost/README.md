# Watchpost

AI checks site video for defined events and sends supervisors the relevant clip.

For security operators managing warehouses and commercial sites. Watchpost looks for events such as an open service gate or movement in a closed area, then gives the supervisor a timestamped review queue.

## Product workflow

- Buyer: Contract security operators & site supervisors
- Input: Authorized camera streams and site event rules
- AI output: A timestamped event clip and reason for review
- Human action: Record the supervisor response

No face identification or automatic emergency dispatch. A supervisor verifies every event and follows the site’s response procedure.

## Design

**Security command desk.** Dark multi-monitor opening → event timeline → supervisor feed → camera context → event rules → Azure video architecture → monitored rollout.

Heading: Space Grotesk. Body: DM Sans. Accent: #c0e58d.

Logo: Two observation brackets and a central line make a W without a conventional shield.

The standalone site contains 24 routed pages (including home/technology aliases) plus its 404 page. Problem, solution, market and combined legal pages join the team, contact, roadmap and policy pages. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@watchpost.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure Machine Learning online endpoints](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-online?view=azureml-api-2): Host a trained event-detection model for sampled frames; GPU capacity depends on the chosen model and regional quota. **Planned integration.**
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Retain authorized event clips and the reviewed time window according to the site’s retention policy. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Summarize a grouped event and the site rule without identifying a person. **Connector implemented · configure Azure deployment.**
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions): Deliver a single grouped review item to the supervisor and handle processing failures. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect an authorized test video source and train/evaluate the defined event detector; implement clip retention and event grouping.
- **04. Reviewed field pilot — Planned:** Compare grouped events with supervisor review, measure false and missed events, and verify access and retention controls.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

55 hypothetical organizations × 8 camera streams per operator × 21,600 monitored minutes / stream / month × 6 sampled frames per minute = **57,024,000 frame checks per month**.

The scenario assumes 12 hours per day for 30 days. Sampling six frames per minute produces a large recurring computer-vision workload; full clips are escalated only for defined events.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode, with a short implementation bio. The enquiry form prepares a message for review and final submission on GitHub, or through a verified email when configured. A separate local project brief can be saved and downloaded.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.

## Interactive product tools

Plan the frame-review workload. Change camera count, operating hours and frame sampling rate. This capacity tool does not connect a video feed or claim measured detection performance.

The value planner compares your own review-time assumptions and exports the plan. Buyer tabs explain the segments, the solution tour steps through the workflow, and infrastructure tabs explain each service’s job. The homepage also includes a product-specific Why now, outcome measures, market strategy, software progress and three commercial plan tiers.

## Independent AI service and deployment

This kit includes its own `service/ai-service.mjs`, product definition and provider configuration. With Node 20+, run `npm run api` from this kit after configuring server-side provider credentials. The adapter accepts only Watchpost requests. See `deployment/README.md` for the Azure Static Web Apps workflow and custom-domain setup; the model service deploys separately.

Company, domain, contact and booking fields are controlled in the complete repository’s [OWNER_SETUP.md](../../OWNER_SETUP.md). Unverified values remain unpublished.
