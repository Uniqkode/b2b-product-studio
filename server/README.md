# Connected AI analysis

The published websites include prepared review cases. This optional Node.js 20+ adapter can make real Azure OpenAI or OpenAI Responses API calls with text and images after you configure an account. Provider credentials stay on the server. No Azure resource, consumption, model quality or production readiness is established by the code alone.

## Azure OpenAI

Create an Azure OpenAI resource and deploy a Responses-compatible model that supports vision and structured output in your chosen region. The deployment name, rather than a catalog model name, is sent in `model`. Check model availability, quota and the [Microsoft Responses API documentation](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses).

Set these variables in the server's secret configuration; `.env.azure.example` documents the names. The adapter does not automatically load `.env` files.

| Variable | Value |
| --- | --- |
| `AI_PROVIDER` | `azure` |
| `AZURE_OPENAI_ENDPOINT` | Your resource origin, such as `https://YOUR-RESOURCE.openai.azure.com` |
| `AZURE_OPENAI_DEPLOYMENT` | The name of your actual model deployment |
| `AZURE_OPENAI_API_KEY` | The resource key, held only on the server |
| `AZURE_OPENAI_AUTH_TOKEN` | Optional current Microsoft Entra access token instead of an API key |

The adapter calls `/openai/v1/responses`. With a key it uses the `api-key` header; with an Entra token it uses `Authorization: Bearer`. An Entra token must have the appropriate audience and permissions and be refreshed by the deployment's identity system; this adapter does not implement automatic token renewal. Only Azure HTTPS resource endpoints are accepted. `/api/health` reports readiness but never returns the endpoint, deployment name or credentials.

```sh
npm run api
```

The server binds to `127.0.0.1:8787`. In a dashboard, expand **Use your own files with a connected AI service**, enter `http://localhost:8787`, add non-sensitive test text or images and choose **Analyze with connected service**. That action sends the material to this service and its configured provider. The provider bills the configured account. Prepared cases make no provider request.

## Alternative OpenAI configuration

Set `AI_PROVIDER=openai` and `OPENAI_API_KEY` in the server environment. `OPENAI_MODEL` defaults to `gpt-4.1-mini`; select a compatible vision/structured-output model available to your account. The alternative uses `https://api.openai.com/v1/responses`.

## Remote deployment

GitHub Pages cannot execute server code or keep API keys. Deploy this adapter separately on a suitable Node host, configure HTTPS and an explicit `AI_ALLOWED_ORIGINS` list. Binding `AI_LISTEN_HOST` outside localhost requires `AI_SERVICE_TOKEN` with at least 24 characters. Enter that service token in the connected-analysis form; it is used for the request and is not saved in browser storage.

Organizational production use also needs user authentication, tenant authorization, quotas, retention rules, evaluation and monitoring. The technology pages name product-specific roles for Azure Document Intelligence, AI Search, Machine Learning, IoT Hub, Blob Storage and Service Bus. These integrations are planned, not implemented or deployed by this adapter. Microsoft Entra External ID and Azure Monitor are identified for production identity and operations. The public roadmaps show that distinction.

## Request contract and safeguards

- `GET /api/health`: `{ configured, provider, authenticationRequired, mode }`.
- `POST /api/analyze`: `{ brand, inputs }`, using one of the ten product slugs.
- Text: `{ id: "S1", name: "Lease extract", kind: "text", text: "..." }`.
- Image: `{ id: "I1", name: "inspection.jpg", kind: "image", image: "data:image/jpeg;base64,..." }`.
- Limits: eight sources; four images up to 2 MB each; 30,000 characters per text source; 90,000 text characters total; 12 MB request body.
- Result: `{ report, usage, model, provider, cached }`, with source-linked findings, uncertainty and a human review action.

Text quotations are checked against their cited sources. Image observations require human verification. Supplied material is untrusted evidence, not instructions. The prompt disallows invented sources, identity recognition and automatic professional or access decisions.

Identical requests share an in-memory cache for ten minutes (100 results maximum); overlapping requests share one provider call. Cache entries may contain quoted input, but not the raw images. Restarting clears them. Requests use `store: false`, which does not replace the provider's applicable data policy. There is no application request-body logging. The built-in cap is 12 analysis requests per minute per connection.

Automated provider tests use mocks. No paid AI call, Azure credit spend or cloud deployment was performed by those checks. Real usage must be measured from the configured Azure resources and related billing/telemetry.
