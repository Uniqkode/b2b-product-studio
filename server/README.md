# Connected AI analysis

The published GitHub Pages websites include prepared review reports. This optional Node adapter makes real AI requests when you configure your own provider account. No API key is committed or shipped to the browser.

Requires Node.js 20 or newer. It uses the OpenAI Responses API and structured output. The default model is `gpt-4.1-mini`; select another compatible vision/structured-output model with `OPENAI_MODEL`.

## Run locally

Set `OPENAI_API_KEY` in the server environment through your secret manager or terminal session, then run:

```sh
npm run api
```

The adapter binds to `127.0.0.1:8787`. On the website, expand **Use your own files with a connected AI service**, enter `http://localhost:8787`, add non-sensitive test text or images and choose **Analyze with connected service**. This is the action that sends the material to the configured service and, through it, to the AI provider. Provider usage is billed to the configured account. Prepared examples make no provider request.

## Remote deployment

The adapter is separate from GitHub Pages, which cannot execute server code or keep an API key secret. Deploy the server to an appropriate Node host, configure HTTPS and an explicit `AI_ALLOWED_ORIGINS` list. `AI_LISTEN_HOST` defaults to localhost. Binding to another interface requires an `AI_SERVICE_TOKEN` of at least 24 characters. Enter that service access token in the connected-analysis form; it is used for the request and is not saved in browser storage.

For organizational use, replace the shared service token with proper user authentication, organization authorization and per-tenant quotas. Configure input retention, a provider agreement and evaluation appropriate to the real data. The supplied public demo is not a production account or evidence-management service.

## Contract

- `GET /api/health` returns whether a provider key is configured. It never returns the key.
- `POST /api/analyze` accepts `{ brand, inputs }`. `brand` must be one of the ten product slugs.
- Text input: `{ id: "S1", name: "Lease extract", kind: "text", text: "..." }`.
- Image input: `{ id: "I1", name: "inspection.jpg", kind: "image", image: "data:image/jpeg;base64,..." }`.
- Maximum: eight sources; four images of 2 MB each; 30,000 characters per text source; 90,000 total text characters; 12 MB request body.
- The response includes `{ report, usage, model, cached }`. The report has a summary and findings with source, quote, uncertainty level and suggested human action.

Exact text quotations are checked against their stated source. Image observations remain model interpretations requiring human verification. The prompt treats supplied material as evidence, not instructions, and prohibits invented sources, identity recognition and automatic professional or access decisions.

Identical requests are cached in memory for ten minutes, with a maximum of 100 retained results. The cache stores review output, not the raw images; a report may still contain sensitive quoted text. Restarting clears it. The adapter requests `store: false` at the provider, which does not replace the provider's applicable data policy. There is no application request-body logging. The built-in rate cap is 12 analysis requests per minute per connection.

The service makes one bounded model request per accepted analysis. Published workload estimates describe the full proposed product deployment; they are not evidence that this adapter currently receives that traffic. Production video sampling, sensor ingestion, document conversion/OCR and background scheduling remain integration work.
