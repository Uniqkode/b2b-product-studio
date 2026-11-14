# Fieldwell

AI checks field photos and shows agronomists where to inspect next.

For commercial growers and agronomy teams. Fieldwell compares drone and scouting photos, marks signs of crop stress, and turns each survey into a field-by-field inspection report.

## Product workflow

- Buyer: Commercial growers & agronomy teams
- Input: Drone surveys and scouting photos
- AI output: A crop-risk map and inspection list
- Human action: Assign an inspection

It supports scouting. A photograph alone cannot confirm disease, nutrient deficiency or a treatment.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@fieldwell.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

72 hypothetical organizations × 20 fields per organization × 2 surveys per field / month × 240 photos per survey = **691,200 image reviews / month**.

Fresh survey imagery arrives throughout the season. The AI must compare many images before it can produce one useful field report.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: Manrope. Body: DM Sans. Accent: #086b50. Signature: Field contours.

Logo: Three cultivated rows bend into an F; an open seed shape leaves room for growth.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
