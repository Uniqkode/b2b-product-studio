# Gatehouse

AI reads contractor documents and flags missing or expired evidence for a reviewer.

For industrial workplaces and facilities teams. Gatehouse compares training certificates, insurance schedules and work-permit requirements, then explains what is missing before a contractor starts a job.

## Product workflow

- Buyer: Industrial workplaces & facilities teams
- Input: Training certificates, insurance schedules and job requirements
- AI output: A contractor checklist with missing or conflicting evidence
- Human action: Request the missing evidence

It checks supplied documents. It does not authenticate a certificate, identify a person or independently authorize workplace access.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@gatehouse.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

48 hypothetical organizations × 120 contractor packs per team × 2 new or changed reviews / month × 18 pages per contractor pack = **207,360 document pages / month**.

New jobs and expiring documents create repeated reading and comparison work. The scope is contractor evidence, rather than a low-volume visitor register.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: Manrope. Body: Manrope. Accent: #be403f. Signature: Doorway arches and stamped visitor passes.

Logo: A doorway cut from a G creates a welcoming entrance with a clear boundary.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
