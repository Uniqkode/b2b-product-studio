# Plotmark

AI compares land documents and survey references before an acquisition review.

For property developers and land acquisition teams. Plotmark reads title papers, survey plans and planning documents, then lists missing evidence and conflicting parcel details with page references.

## Product workflow

- Buyer: Property developers & acquisition teams
- Input: Title papers, survey plans and planning documents
- AI output: A parcel review brief with document conflicts and missing evidence
- Human action: Send for professional review

It prepares a due-diligence brief. It does not confirm ownership, verify a registry entry or replace a lawyer or licensed surveyor.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@plotmark.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

60 hypothetical organizations × 35 parcel files per team / month × 1 review per changed file × 180 pages per parcel file = **378,000 document pages / month**.

The workload is long-document reading and comparison across many acquisition files. Unchanged pages can be cached; new revisions trigger a fresh comparison.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: DM Sans. Body: Manrope. Accent: #c46431. Signature: Survey crosshairs, parcel outlines and coordinates.

Logo: A parcel outline folds into a P, anchored by a survey pin at its baseline.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
