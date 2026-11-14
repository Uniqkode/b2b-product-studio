# Rill

AI forecasts crop water demand and gives irrigation teams a daily zone plan.

For commercial farms and irrigation cooperatives. Rill combines soil readings, weather forecasts and crop stage to estimate the next watering need for each zone.

## Product workflow

- Buyer: Commercial farms & irrigation cooperatives
- Input: Soil readings, weather and crop stage
- AI output: A water-demand forecast for each irrigation zone
- Human action: Approve the watering plan

A farm operator checks sensor quality and local conditions before any watering decision. This MVP does not control pumps.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@rill.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

80 hypothetical organizations × 60 zones per farm × 120 updates per zone / month × 1 forecast per update = **576,000 zone forecasts / month**.

Four daily updates across 60 zones create 7,200 forecasts per farm each month. The work repeats because weather and field conditions change.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: Outfit. Body: DM Sans. Accent: #007e9a. Signature: Rill channels and measured water rings.

Logo: An R made from two flowing channels; the counter is a water drop.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
