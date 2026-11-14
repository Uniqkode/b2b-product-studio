# Coldline

AI reviews produce images and temperature histories to flag shipments at risk.

For fresh-produce exporters, cold stores and logistics operators. Coldline checks pallet images and changing temperature records, then explains which shipment needs a cold-chain intervention.

## Product workflow

- Buyer: Produce exporters & cold-chain operators
- Input: Pallet images and shipment temperature histories
- AI output: A condition warning with the affected pallet and reason
- Human action: Assign a cold-chain check

The warning supports an inspection. It does not certify food safety or replace a qualified quality decision.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@coldline.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

55 hypothetical organizations × 120 active shipments per operator × 24 checks per shipment / month × 4 images and records per check = **633,600 condition checks / month**.

The same load is checked at multiple points. The value comes from combining visual condition with its changing storage and transport history.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: Space Grotesk. Body: Manrope. Accent: #136f99. Signature: Temperature trace and cargo-label corners.

Logo: A squared C encloses a temperature line; the open edge represents goods moving through.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
