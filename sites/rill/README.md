# Rill

AI forecasts crop water demand and gives irrigation teams a daily zone plan.

For commercial farms and irrigation cooperatives. Rill combines soil readings, weather forecasts and crop stage to estimate the next watering need for each zone.

## Product workflow

- Buyer: Commercial farms & irrigation cooperatives
- Input: Soil readings, weather and crop stage
- AI output: A water-demand forecast for each irrigation zone
- Human action: Approve the watering plan

A farm operator checks sensor quality and local conditions before any watering decision. This MVP does not control pumps.

## Design

**Irrigation planning studio.** Centered water statement → irrigation panorama → zone planner → field conditions → forecasting service path → water-cycle roadmap.

Heading: Outfit. Body: DM Sans. Accent: #007e9a.

Logo: An R made from two flowing channels; the counter is a water drop.

The standalone site contains 18 routed pages plus its 404 page, including team, contact, roadmap, privacy, data policy and responsible AI policy. Three industry photographs are included locally. Source, author, license and modification details are in `dist/assets/image-sources.json`, `dist/assets/editorial-sources.json` and Terms & credits. Font licenses are in `dist/assets/FONT-LICENSES.txt`.

## Try the workspace

Serve `dist/` using any static HTTP server. No dependency installation or build step is needed for this standalone output. Use `demo@rill.example` and `MVPdemo2026!`, or the one-click sample workspace. This is public demo access, not production authentication.

Choose a prepared case, run the review, open a citation, retain the report for human review and download it. Operational records support creation, notes, status changes, search, filters, sorting and CSV export. Prepared runs make no model request.

## Azure architecture

- [Azure IoT Hub](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub): Receive authenticated soil, flow-meter and field-device readings. **Planned integration.**
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Run repeated zone-level water-demand forecasts and evaluate them against actual field outcomes. **Planned integration.**
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Explain the forecast, operating limit and uncertainty in a readable zone plan. **Connector implemented · configure Azure deployment.**
- [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview): Track missing sensor data, forecast jobs and operator review exceptions. **Planned integration.**

The repository includes the optional [server-side Azure OpenAI and OpenAI adapter](../../server/README.md). Azure use requires a deployed compatible model, resource endpoint and server credentials. No Azure resource is connected by the public static site. GitHub Pages cannot execute the server or keep a secret.

## Development roadmap

- **01. Product foundation — Built:** Website, review workspace, source citations, report retention, operational register and downloads are implemented.
- **02. Azure model connection — Ready to configure:** Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.
- **03. Sector data integration — Planned:** Connect sensor readings and weather data; train and evaluate a field-specific demand model.
- **04. Reviewed field pilot — Planned:** Compare recommended allocations with soil trends and operator-recorded water applications across a growing period.
- **05. Production operations — Planned:** Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.

## Workload planning

80 hypothetical organizations × 60 zones per farm × 120 updates per zone / month × 1 forecast per update = **576,000 zone forecasts per month**.

Four daily updates across 60 zones create 7,200 forecasts per farm each month. The work repeats because weather and field conditions change.

These assumptions do not establish actual customers, Azure consumption or model accuracy.

## Company details and contact

The team page identifies the public repository maintainer, Precious Arinze / Uniqkode. Responsibility areas are described without inventing staff appointments. Contact links open a public product enquiry; the pilot form saves a local brief and sends no email.

Legal names and RC numbers are managed in `src/company-profiles.json` in the complete repository. Registration is unpublished unless the record has `registrationVerified: true`, a genuine legal name and RC number, and an evidence reference. Do not use placeholder registrations in applications.

## Current scope

Prepared operational cases use sample data. Browser-local edits and reports are not shared between users. Connected analysis sends entered material only when explicitly run. Shared accounts, sector ingestion, OCR, trained vision/forecast models, retention and production monitoring remain work described by the roadmap.
