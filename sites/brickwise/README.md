# Brickwise

AI reviews building inspection images and notes, then drafts an evidence-linked repair list.

For facility managers and building maintenance teams. Brickwise groups repeated defects in photos, reads technician notes and suggests which issues need a qualified inspection first.

## Product workflow

- Buyer: Facility managers & building operators
- Input: Inspection photos, thermal images and technician notes
- AI output: A grouped defect list and draft work orders
- Human action: Create the reviewed work order

An image cannot certify structural or equipment safety. A qualified professional inspects the condition and approves the work.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@brickwise.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

65 hypothetical organizations × 12 buildings per operator × 2 surveys per building / month × 180 images per survey = **280,800 inspection images / month**.

The model reviews fresh inspection imagery across a property portfolio and compares follow-up photos with the original defect record.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: Barlow Condensed. Body: Manrope. Accent: #e9ae29. Signature: Work-order tabs and offset masonry blocks.

Logo: Offset masonry units build a B with an open service passage through the center.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
