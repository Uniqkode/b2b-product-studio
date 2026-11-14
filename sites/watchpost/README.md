# Watchpost

AI checks site video for defined events and sends supervisors the relevant clip.

For security operators managing warehouses and commercial sites. Watchpost looks for events such as an open service gate or movement in a closed area, then gives the supervisor a timestamped review queue.

## Product workflow

- Buyer: Contract security operators & site supervisors
- Input: Authorized camera streams and site event rules
- AI output: A timestamped event clip and reason for review
- Human action: Record the supervisor response

No face identification or automatic emergency dispatch. A supervisor verifies every event and follows the site’s response procedure.

## Try the workspace

Serve `dist/` using any static HTTP server. There is no dependency installation or build step for the standalone website. Use `demo@watchpost.example` and `MVPdemo2026!`, or the one-click preview. This is demonstration access, not production authentication.

Choose a prepared case, run the analysis, open a cited source, accept the report for human review and download it. The dashboard retains reports in this browser and supports operational records, notes, completion/reopening, filters, sorting and CSV export. Prepared sample runs make no model request.

## Connected AI

The complete repository includes the optional [AI server adapter](../../server/README.md). It can analyze test text and images with a configured server-side provider key. The standalone static output cannot keep a provider key or run a server. Do not put credentials in its JavaScript.

## Workload planning

55 hypothetical organizations × 8 camera streams per operator × 21,600 monitored minutes / stream / month × 6 sampled frames per minute = **57,024,000 frame checks / month**.

The scenario assumes 12 hours per day for 30 days. Sampling six frames per minute produces a large recurring computer-vision workload; full clips are escalated only for defined events.

These are planning assumptions, not live usage or customer traction.

## Identity

Heading: Space Grotesk. Body: DM Sans. Accent: #c0e58d. Signature: Observation brackets and quiet radar lines.

Logo: Two observation brackets and a central line make a W without a conventional shield.

SVG: `dist/assets/logo.svg`. Photography and font notices are in `dist/assets/image-sources.json` and `dist/assets/FONT-LICENSES.txt`.

## Scope

Prepared data is illustrative. Browser-local edits, reports and drafts are not synchronized between users. Connected analysis transmits the entered material only when that mode is explicitly run. No production identity, camera/sensor ingestion, OCR pipeline, professional certification or automatic operational control is implied.
