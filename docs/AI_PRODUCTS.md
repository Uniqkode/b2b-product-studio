# Ten AI products and their workloads

Each product addresses repeated organizational work. Volumes below are explicit planning scenarios, not existing customers, measured performance, actual Azure usage or a credit entitlement. Cache unchanged evidence and group repeated events rather than creating unnecessary consumption.

| Product | AI use case | Planned monthly processing |
| --- | --- | --- |
| [Fieldwell](https://uniqkode.github.io/b2b-product-studio/fieldwell/) | AI checks field photos and shows agronomists where to inspect next. | 691,200 image reviews |
| [GrainLedger](https://uniqkode.github.io/b2b-product-studio/grainledger/) | AI reviews grain photos and intake documents before a lot is released. | 359,424 photo & page reviews |
| [Rill](https://uniqkode.github.io/b2b-product-studio/rill/) | AI forecasts crop water demand and gives irrigation teams a daily zone plan. | 576,000 zone forecasts |
| [Coldline](https://uniqkode.github.io/b2b-product-studio/coldline/) | AI reviews produce images and temperature histories to flag shipments at risk. | 633,600 condition checks |
| [Plotmark](https://uniqkode.github.io/b2b-product-studio/plotmark/) | AI compares land documents and survey references before an acquisition review. | 378,000 document pages |
| [Leasewell](https://uniqkode.github.io/b2b-product-studio/leasewell/) | AI reads commercial leases and amendments, then lists the obligations that need action. | 472,500 document pages |
| [Brickwise](https://uniqkode.github.io/b2b-product-studio/brickwise/) | AI reviews building inspection images and notes, then drafts an evidence-linked repair list. | 280,800 inspection images |
| [Watchpost](https://uniqkode.github.io/b2b-product-studio/watchpost/) | AI checks site video for defined events and sends supervisors the relevant clip. | 57,024,000 frame checks |
| [Gatehouse](https://uniqkode.github.io/b2b-product-studio/gatehouse/) | AI reads contractor documents and flags missing or expired evidence for a reviewer. | 207,360 document pages |
| [Proofline](https://uniqkode.github.io/b2b-product-studio/proofline/) | AI compares supplier security documents with your questions and cites the answers. | 384,000 document pages |

## Fieldwell

**Buyer:** Commercial growers & agronomy teams.

**Input → output:** Drone surveys and scouting photos → A crop-risk map and inspection list.

**Why AI is useful:** One drone survey can contain hundreds of overlapping images. The useful job is to compare new observations with the last survey and group repeated signs of stress into areas a field team can inspect.

**Volume assumption:** 72 hypothetical organizations × 20 fields per organization × 2 surveys per field / month × 240 photos per survey = **691,200 image reviews per month**.

Fresh survey imagery arrives throughout the season. The AI must compare many images before it can produce one useful field report.

**Azure services:**

- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep original drone images, field references and dated survey files together. Planned integration.
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Run batches of crop-image checks on a trained vision model; compare the same field across survey dates. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Turn grouped image observations and scout notes into a plain-language inspection brief. Connector implemented · configure Azure deployment.
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions): Queue new surveys and retry failed work without reprocessing an unchanged survey. Planned integration.

**Human review:** It supports scouting. A photograph alone cannot confirm disease, nutrient deficiency or a treatment.

**Next integration:** Connect drone survey uploads and field boundaries; evaluate a crop-specific vision model against labelled observations.

## GrainLedger

**Buyer:** Grain aggregators & warehouse quality teams.

**Input → output:** Grain photos, scale tickets and moisture sheets → A lot-quality report with discrepancies highlighted.

**Why AI is useful:** Every truck creates new photos and paperwork. The AI has to inspect many grains in each image, read the related tickets and compare the results before it can flag a lot for review.

**Volume assumption:** 64 hypothetical organizations × 18 deliveries per warehouse / day × 26 receiving days / month × 12 photos and pages per delivery = **359,424 photo & page reviews per month**.

Daily truck arrivals create a repeated visual-inspection and document-reading workload, rather than a one-off chatbot conversation.

**Azure services:**

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Extract lot references, net weights and moisture observations from intake paperwork. Planned integration.
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Inspect standardized grain photos for candidate broken-kernel, discoloration or foreign-material observations. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Compare extracted readings and explain the discrepancy for the warehouse quality manager. Connector implemented · configure Azure deployment.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Retain the source ticket, sample photo and reviewed intake report under the lot reference. Planned integration.

**Human review:** Visual grading is a screening step. A warehouse specialist confirms the grade, sampling method and test results.

**Next integration:** Connect scale-ticket and moisture-sheet ingestion; build a standardized grain-photo evaluation dataset.

## Rill

**Buyer:** Commercial farms & irrigation cooperatives.

**Input → output:** Soil readings, weather and crop stage → A water-demand forecast for each irrigation zone.

**Why AI is useful:** Water demand changes with the weather and crop stage. Each new forecast requires the model to reassess every active zone and compare the recommendation with available pump capacity.

**Volume assumption:** 80 hypothetical organizations × 60 zones per farm × 120 updates per zone / month × 1 forecast per update = **576,000 zone forecasts per month**.

Four daily updates across 60 zones create 7,200 forecasts per farm each month. The work repeats because weather and field conditions change.

**Azure services:**

- [Azure IoT Hub](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub): Receive authenticated soil, flow-meter and field-device readings. Planned integration.
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Run repeated zone-level water-demand forecasts and evaluate them against actual field outcomes. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Explain the forecast, operating limit and uncertainty in a readable zone plan. Connector implemented · configure Azure deployment.
- [Azure Monitor](https://learn.microsoft.com/en-us/azure/azure-monitor/overview): Track missing sensor data, forecast jobs and operator review exceptions. Planned integration.

**Human review:** A farm operator checks sensor quality and local conditions before any watering decision. This MVP does not control pumps.

**Next integration:** Connect sensor readings and weather data; train and evaluate a field-specific demand model.

## Coldline

**Buyer:** Produce exporters & cold-chain operators.

**Input → output:** Pallet images and shipment temperature histories → A condition warning with the affected pallet and reason.

**Why AI is useful:** A shipment’s condition can change between collection and delivery. Images, door events and temperature histories must be reviewed repeatedly across many active loads.

**Volume assumption:** 55 hypothetical organizations × 120 active shipments per operator × 24 checks per shipment / month × 4 images and records per check = **633,600 condition checks per month**.

The same load is checked at multiple points. The value comes from combining visual condition with its changing storage and transport history.

**Azure services:**

- [Azure IoT Hub](https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub): Receive shipment temperature readings and equipment events from authorized devices. Planned integration.
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Evaluate changes in produce images alongside the shipment’s temperature history. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Explain the condition warning and identify the evidence the receiving operator should check. Connector implemented · configure Azure deployment.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep checkpoint images and quality review records attached to the shipment. Planned integration.

**Human review:** The warning supports an inspection. It does not certify food safety or replace a qualified quality decision.

**Next integration:** Connect temperature devices, shipment references and checkpoint image capture.

## Plotmark

**Buyer:** Property developers & acquisition teams.

**Input → output:** Title papers, survey plans and planning documents → A parcel review brief with document conflicts and missing evidence.

**Why AI is useful:** An acquisition file can include hundreds of scanned pages and several versions of a survey. The AI must read the pages, match parcel references and compare conflicting details across the file.

**Volume assumption:** 60 hypothetical organizations × 35 parcel files per team / month × 1 review per changed file × 180 pages per parcel file = **378,000 document pages per month**.

The workload is long-document reading and comparison across many acquisition files. Unchanged pages can be cached; new revisions trigger a fresh comparison.

**Azure services:**

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Read supplied title schedules, planning documents and survey-page text while retaining page references. Planned integration.
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Find the relevant parcel references and passages across a document package. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Compare conflicting document details and draft a question with exact source quotations. Connector implemented · configure Azure deployment.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Version the supplied acquisition file and the reviewed parcel report. Planned integration.

**Human review:** It prepares a due-diligence brief. It does not confirm ownership, verify a registry entry or replace a lawyer or licensed surveyor.

**Next integration:** Connect document upload, page extraction and parcel-reference indexing; validate quotation and version handling.

## Leasewell

**Buyer:** Commercial property & asset managers.

**Input → output:** Leases, amendments and related rent documents → A lease brief with dates, obligations and cited clauses.

**Why AI is useful:** A property portfolio contains long agreements, repeated amendments and changing obligations. The AI must find the relevant clause and check whether a later document changes its meaning.

**Volume assumption:** 75 hypothetical organizations × 45 lease packs per team / month × 1 review per changed pack × 140 pages per lease pack = **472,500 document pages per month**.

Each new pack requires a detailed read and cross-document check. Portfolio reviews repeat the work for changed agreements and approaching obligations.

**Azure services:**

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Extract clause text, tables and schedules from lease packs and amendments. Planned integration.
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Retrieve the original clause and the later wording that may change it. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Prepare an obligation brief with cited clauses, dates and a human review action. Connector implemented · configure Azure deployment.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep the reviewed document versions and lease brief together. Planned integration.

**Human review:** It supports lease administration. Legal interpretation, contractual notices and commercial decisions require the appointed professional.

**Next integration:** Connect PDF lease packs and amendment versions; build a reviewed obligation schema.

## Brickwise

**Buyer:** Facility managers & building operators.

**Input → output:** Inspection photos, thermal images and technician notes → A grouped defect list and draft work orders.

**Why AI is useful:** A multi-building inspection generates thousands of images and notes. The AI must distinguish duplicate observations, link them to the right asset and prepare a useful issue summary.

**Volume assumption:** 65 hypothetical organizations × 12 buildings per operator × 2 surveys per building / month × 180 images per survey = **280,800 inspection images per month**.

The model reviews fresh inspection imagery across a property portfolio and compares follow-up photos with the original defect record.

**Azure services:**

- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Keep inspection and follow-up images under a stable building and asset reference. Planned integration.
- [Azure Machine Learning](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2): Run a trained inspection model over new images and group repeated candidate defects. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Combine image observations and technician notes into a draft repair list. Connector implemented · configure Azure deployment.
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions): Queue site inspections, track failures and avoid duplicate work orders for the same reviewed issue. Planned integration.

**Human review:** An image cannot certify structural or equipment safety. A qualified professional inspects the condition and approves the work.

**Next integration:** Connect asset-labelled photo uploads and technician notes; evaluate defect grouping before creating operational work orders.

## Watchpost

**Buyer:** Contract security operators & site supervisors.

**Input → output:** Authorized camera streams and site event rules → A timestamped event clip and reason for review.

**Why AI is useful:** Video is a continuous workload. The system checks frames for defined events, groups repeated detections and sends only the relevant time window for a supervisor to review.

**Volume assumption:** 55 hypothetical organizations × 8 camera streams per operator × 21,600 monitored minutes / stream / month × 6 sampled frames per minute = **57,024,000 frame checks per month**.

The scenario assumes 12 hours per day for 30 days. Sampling six frames per minute produces a large recurring computer-vision workload; full clips are escalated only for defined events.

**Azure services:**

- [Azure Machine Learning online endpoints](https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-online?view=azureml-api-2): Host a trained event-detection model for sampled frames; GPU capacity depends on the chosen model and regional quota. Planned integration.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Retain authorized event clips and the reviewed time window according to the site’s retention policy. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Summarize a grouped event and the site rule without identifying a person. Connector implemented · configure Azure deployment.
- [Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions): Deliver a single grouped review item to the supervisor and handle processing failures. Planned integration.

**Human review:** No face identification or automatic emergency dispatch. A supervisor verifies every event and follows the site’s response procedure.

**Next integration:** Connect an authorized test video source and train/evaluate the defined event detector; implement clip retention and event grouping.

## Gatehouse

**Buyer:** Industrial workplaces & facilities teams.

**Input → output:** Training certificates, insurance schedules and job requirements → A contractor checklist with missing or conflicting evidence.

**Why AI is useful:** Large sites onboard many contractors, each with several documents that expire or change. The AI reads the file, extracts the relevant dates and compares the evidence with the job requirements.

**Volume assumption:** 48 hypothetical organizations × 120 contractor packs per team × 2 new or changed reviews / month × 18 pages per contractor pack = **207,360 document pages per month**.

New jobs and expiring documents create repeated reading and comparison work. The scope is contractor evidence, rather than a low-volume visitor register.

**Azure services:**

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Read training certificates, insurance schedules and work-permit evidence supplied for the job. Planned integration.
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Find the requirement and the document passage that does or does not address it. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Compare dates and scope, then explain the missing evidence without authenticating a certificate. Connector implemented · configure Azure deployment.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Retain reviewed document versions under the contractor job pack. Planned integration.

**Human review:** It checks supplied documents. It does not authenticate a certificate, identify a person or independently authorize workplace access.

**Next integration:** Connect document intake, job requirements and expiry-date extraction; implement restricted evidence access.

## Proofline

**Buyer:** Procurement & information-security teams.

**Input → output:** Vendor policies, questionnaires and supporting reports → A cited security review with unanswered evidence requests.

**Why AI is useful:** A single supplier review can involve dozens of long documents and hundreds of questions. The AI must find the relevant passage, compare it with the question and identify conflicting or absent evidence.

**Volume assumption:** 60 hypothetical organizations × 40 vendor reviews per team / month × 1 read per new or changed pack × 160 pages per vendor pack = **384,000 document pages per month**.

The scenario contains 384,000 pages per month. At an illustrative 500 input tokens per page, that is 192 million input tokens before answers, retries or additional review passes.

**Azure services:**

- [Azure AI Document Intelligence](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0): Read policies, questionnaires and supporting reports with page and section references. Planned integration.
- [Azure AI Search](https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview): Find relevant policy passages using exact terms and meaning-based retrieval. Planned integration.
- [Azure OpenAI in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses): Draft cited answers and explain unclear scope or contradictory evidence. Connector implemented · configure Azure deployment.
- [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview): Version the supplier evidence pack and the accepted review brief. Planned integration.

**Human review:** A drafted answer is not an assurance opinion or certification. A qualified reviewer decides whether the evidence is sufficient.

**Next integration:** Connect evidence upload and document indexing; evaluate answer scope and citation accuracy.
