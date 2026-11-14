# Proofline

AI compares supplier security documents with your questions and cites the answers.

For procurement and information-security teams. Proofline reads policies, questionnaires and supporting reports, then drafts a review showing what is supported, unclear or still missing.

## Product workflow

- Buyer: Procurement & information-security teams
- Input: Vendor policies, questionnaires and supporting reports
- AI output: A cited security review with unanswered evidence requests
- Human action: Send the evidence request

A drafted answer is not an assurance opinion or certification. A qualified reviewer decides whether the evidence is sufficient.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@proofline.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

60 hypothetical organizations × 40 vendor reviews per team / month × 1 read per new or changed pack × 160 pages per vendor pack = **384,000 document pages / month**.

The scenario contains 384,000 pages per month. At an illustrative 500 input tokens per page, that is 192 million input tokens before answers, retries or additional review passes.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: IBM Plex Sans. Body: IBM Plex Sans. Accent: #116f68. Signature: Evidence reference lines and annotated document margins.

Logo: A continuous P-shaped evidence line ends in a small verified square, without implying certification.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
