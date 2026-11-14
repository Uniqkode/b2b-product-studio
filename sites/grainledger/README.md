# GrainLedger

AI reviews grain photos and intake documents before a lot is released.

For grain aggregators and warehouse quality teams. GrainLedger checks standardized grain photos, reads weight and moisture records, and flags lots that need a human quality check.

## Product workflow

- Buyer: Grain aggregators & warehouse quality teams
- Input: Grain photos, scale tickets and moisture sheets
- AI output: A lot-quality report with discrepancies highlighted
- Human action: Record quality decision

Visual grading is a screening step. A warehouse specialist confirms the grade, sampling method and test results.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@grainledger.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

64 hypothetical organizations × 18 deliveries per warehouse / day × 26 receiving days / month × 12 photos and pages per delivery = **359,424 photo & page reviews / month**.

Daily truck arrivals create a repeated visual-inspection and document-reading workload, rather than a one-off chatbot conversation.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: IBM Plex Sans. Body: Manrope. Accent: #e6a92e. Signature: Ruled ledger with stamped lot numbers.

Logo: Interlocking G and L strokes form a warehouse tally with three grain bars.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
