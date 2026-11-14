export const azureReferences={
 openai:{name:'Azure OpenAI in Microsoft Foundry',url:'https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/responses'},
 documents:{name:'Azure AI Document Intelligence',url:'https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0'},
 search:{name:'Azure AI Search',url:'https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview'},
 ml:{name:'Azure Machine Learning',url:'https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-batch?view=azureml-api-2'},
 mlonline:{name:'Azure Machine Learning online endpoints',url:'https://learn.microsoft.com/en-us/azure/machine-learning/concept-endpoints-online?view=azureml-api-2'},
 blob:{name:'Azure Blob Storage',url:'https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview'},
 queue:{name:'Azure Service Bus',url:'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions'},
 iot:{name:'Azure IoT Hub',url:'https://learn.microsoft.com/en-us/azure/iot-hub/iot-concepts-and-iot-hub'},
 monitor:{name:'Azure Monitor',url:'https://learn.microsoft.com/en-us/azure/azure-monitor/overview'},
 identity:{name:'Microsoft Entra External ID',url:'https://learn.microsoft.com/en-us/entra/external-id/external-identities-overview'}
};
const service=(ref,job,status='Planned integration')=>({...azureReferences[ref],job,status});
const generation=job=>service('openai',job,'Connector implemented · configure Azure deployment');

export const productPlans={
 fieldwell:{
  composition:'Landscape opening → field map → scouting photography → survey report → Azure batch path → seasonal roadmap',
  design:'Field atlas',nav:'landscape',gallery:['fieldwell-field','fieldwell-detail'],
  galleryAlt:['Healthy corn rows in a cultivated field','Maize leaf and crop condition photograph'],
  chapters:[['Survey the whole field','Drone and scouting images belong to a dated field survey, not an unstructured photo folder.'],['Find the next inspection area','Group repeated crop-stress observations and retain the image that supports each flag.'],['Keep the agronomist in the loop','The field team checks the suspected issue before selecting a treatment.']],
  azure:[service('blob','Keep original drone images, field references and dated survey files together.'),service('ml','Run batches of crop-image checks on a trained vision model; compare the same field across survey dates.'),generation('Turn grouped image observations and scout notes into a plain-language inspection brief.'),service('queue','Queue new surveys and retry failed work without reprocessing an unchanged survey.')],
  next:'Connect drone survey uploads and field boundaries; evaluate a crop-specific vision model against labelled observations.',
  pilot:'Have agronomists review flagged areas against field inspections and track missed and duplicate observations.',
  reviewRoles:['Agronomy review','Field operations','Model evaluation']
 },
 grainledger:{
  composition:'Ledger masthead → intake book → warehouse photo spread → weight comparison → quality desk → processing stack → rollout ledger',
  design:'Warehouse ledger',nav:'ledger',gallery:['grainledger-store','grainledger-detail'],galleryAlt:['Modern warehouse storage and handling','Combine harvester working in a wheat field'],
  chapters:[['A sample, a ticket, a lot','Use the same lot reference for the grain photo, moisture sheet and dispatch record.'],['Check quality and quantity together','A visual grading flag and a weight discrepancy need different checks, but the same intake decision.'],['Release with a recorded review','The quality manager confirms the physical sample and the reconciled quantity.']],
  azure:[service('documents','Extract lot references, net weights and moisture observations from intake paperwork.'),service('ml','Inspect standardized grain photos for candidate broken-kernel, discoloration or foreign-material observations.'),generation('Compare extracted readings and explain the discrepancy for the warehouse quality manager.'),service('blob','Retain the source ticket, sample photo and reviewed intake report under the lot reference.')],
  next:'Connect scale-ticket and moisture-sheet ingestion; build a standardized grain-photo evaluation dataset.',pilot:'Compare visual flags with physical grading tests and verify that intake discrepancies cite the correct tickets.',reviewRoles:['Warehouse quality','Intake reconciliation','Vision model evaluation']
 },
 rill:{
  composition:'Centered water statement → irrigation panorama → zone planner → field conditions → forecasting service path → water-cycle roadmap',
  design:'Irrigation planning studio',nav:'water',gallery:['rill-field','rill-detail'],galleryAlt:['Drip irrigation equipment in a cultivated field','An irrigation channel beside cultivated fields'],
  chapters:[['Read the ground','A recent soil trend gives the watering decision context.'],['Recalculate when conditions change','Crop stage, forecast weather and pump capacity belong in the next daily plan.'],['Confirm the actual cycle','Compare the approved allocation with what the operator records at the flow meter.']],
  azure:[service('iot','Receive authenticated soil, flow-meter and field-device readings.'),service('ml','Run repeated zone-level water-demand forecasts and evaluate them against actual field outcomes.'),generation('Explain the forecast, operating limit and uncertainty in a readable zone plan.'),service('monitor','Track missing sensor data, forecast jobs and operator review exceptions.')],
  next:'Connect sensor readings and weather data; train and evaluate a field-specific demand model.',pilot:'Compare recommended allocations with soil trends and operator-recorded water applications across a growing period.',reviewRoles:['Irrigation operations','Agronomy review','Forecast evaluation']
 },
 coldline:{
  composition:'Route opening → three checkpoint photographs → excursion timeline → condition brief → logistics architecture → checkpoint roadmap',
  design:'Cold-chain journey',nav:'route',gallery:['coldline-store','coldline-truck'],galleryAlt:['Warehouse picking and storage aisles','A refrigerated logistics truck'],
  chapters:[['Collection','Capture the product condition and temperature at the first handover.'],['Transit','Relate a temperature change to the shipment and the point in its journey.'],['Receiving','Give the quality operator the images, history and next action in one brief.']],
  azure:[service('iot','Receive shipment temperature readings and equipment events from authorized devices.'),service('ml','Evaluate changes in produce images alongside the shipment’s temperature history.'),generation('Explain the condition warning and identify the evidence the receiving operator should check.'),service('blob','Keep checkpoint images and quality review records attached to the shipment.')],
  next:'Connect temperature devices, shipment references and checkpoint image capture.',pilot:'Compare warnings with quality inspections at handover; calibrate thresholds for each produce category.',reviewRoles:['Cold-chain operations','Produce quality','Data integration']
 },
 plotmark:{
  composition:'Parcel workspace → survey context → document comparison → acquisition questions → Azure document pipeline → due-diligence roadmap',
  design:'Survey and parcel desk',nav:'survey',gallery:['plotmark-survey','plotmark-site'],galleryAlt:['A surveyor using land measurement equipment','Aerial construction and land development context'],
  chapters:[['The parcel is the anchor','Keep the parcel reference beside every title, planning and survey document.'],['A discrepancy is a question','An area mismatch needs cited evidence and a qualified professional to resolve it.'],['A review is a record','Retain the source version and the adviser’s conclusion alongside the acquisition decision.']],
  azure:[service('documents','Read supplied title schedules, planning documents and survey-page text while retaining page references.'),service('search','Find the relevant parcel references and passages across a document package.'),generation('Compare conflicting document details and draft a question with exact source quotations.'),service('blob','Version the supplied acquisition file and the reviewed parcel report.')],
  next:'Connect document upload, page extraction and parcel-reference indexing; validate quotation and version handling.',pilot:'Have lawyers and licensed surveyors compare the generated questions with a professional review of authorized files.',reviewRoles:['Legal review','Survey review','Acquisition operations']
 },
 leasewell:{
  composition:'Editorial architecture opening → amendment story → lease abstract → property photography → obligation review → clause-processing stack → portfolio roadmap',
  design:'Commercial property journal',nav:'editorial',gallery:['leasewell-office','leasewell-interior'],galleryAlt:['Contemporary architectural building exterior','Commercial office and meeting spaces'],
  chapters:[['The lease','Read the agreement as a complete document, including the schedules that define the obligation.'],['The amendment','Check whether a later document changes a date, notice period or rent provision.'],['The next conversation','Attach the clause to the person responsible for the renewal or review.']],
  azure:[service('documents','Extract clause text, tables and schedules from lease packs and amendments.'),service('search','Retrieve the original clause and the later wording that may change it.'),generation('Prepare an obligation brief with cited clauses, dates and a human review action.'),service('blob','Keep the reviewed document versions and lease brief together.')],
  next:'Connect PDF lease packs and amendment versions; build a reviewed obligation schema.',pilot:'Compare extracted dates, rent calculations and amendment precedence with an appointed lease professional’s review.',reviewRoles:['Property management','Lease/legal review','Document operations']
 },
 brickwise:{
  composition:'Industrial work-order opening → annotated building image → maintenance board → technician detail → inspection review → vision processing stack → asset rollout',
  design:'Maintenance operating board',nav:'industrial',gallery:['brickwise-system','brickwise-building'],galleryAlt:['Hands-on electronic equipment repair','Large commercial building exterior'],
  chapters:[['Inspect','Collect the image, asset reference and technician observation together.'],['Review','Group repeat reports and separate the visible condition from the suspected cause.'],['Repair','A qualified technician approves the work, records the test and adds follow-up evidence.']],
  azure:[service('blob','Keep inspection and follow-up images under a stable building and asset reference.'),service('ml','Run a trained inspection model over new images and group repeated candidate defects.'),generation('Combine image observations and technician notes into a draft repair list.'),service('queue','Queue site inspections, track failures and avoid duplicate work orders for the same reviewed issue.')],
  next:'Connect asset-labelled photo uploads and technician notes; evaluate defect grouping before creating operational work orders.',pilot:'Have qualified technicians review proposed defects and measure duplicate reports, missed defects and repair follow-ups.',reviewRoles:['Facilities operations','Qualified maintenance review','Vision model evaluation']
 },
 watchpost:{
  composition:'Dark multi-monitor opening → event timeline → supervisor feed → camera context → event rules → Azure video architecture → monitored rollout',
  design:'Security command desk',nav:'command',gallery:['watchpost-camera','watchpost-center'],galleryAlt:['Security cameras mounted on a building','Security operations monitoring context'],
  chapters:[['Define the event','Agree the authorized camera, closed period and event that should lead to a review.'],['Group repeated detections','A single open gate should produce one review window, not a stream of duplicate alerts.'],['Verify the response','The supervisor checks the time window and records the site’s own response.']],
  azure:[service('mlonline','Host a trained event-detection model for sampled frames; GPU capacity depends on the chosen model and regional quota.'),service('blob','Retain authorized event clips and the reviewed time window according to the site’s retention policy.'),generation('Summarize a grouped event and the site rule without identifying a person.'),service('queue','Deliver a single grouped review item to the supervisor and handle processing failures.')],
  next:'Connect an authorized test video source and train/evaluate the defined event detector; implement clip retention and event grouping.',pilot:'Compare grouped events with supervisor review, measure false and missed events, and verify access and retention controls.',reviewRoles:['Site security supervision','Video model evaluation','Privacy and access review']
 },
 gatehouse:{
  composition:'Contractor dossier opening → worksite portrait spread → document pass → requirement checklist → evidence review → Azure reading stack → approval-stage roadmap',
  design:'Contractor assurance dossier',nav:'dossier',gallery:['gatehouse-work','gatehouse-site'],galleryAlt:['Construction workers wearing safety helmets','Construction team at a development site'],
  chapters:[['The job','Start with the actual work scope and the dates that need to be covered.'],['The evidence','Read the insurance schedule and training evidence against that scope.'],['The appointed reviewer','A responsible manager verifies the documents and records the sign-off decision.']],
  azure:[service('documents','Read training certificates, insurance schedules and work-permit evidence supplied for the job.'),service('search','Find the requirement and the document passage that does or does not address it.'),generation('Compare dates and scope, then explain the missing evidence without authenticating a certificate.'),service('blob','Retain reviewed document versions under the contractor job pack.')],
  next:'Connect document intake, job requirements and expiry-date extraction; implement restricted evidence access.',pilot:'Have appointed workplace reviewers check whether the proposed gaps match the job requirements and submitted documents.',reviewRoles:['Workplace assurance','Safety document review','Access/privacy review']
 },
 proofline:{
  composition:'Evidence review interface → policy/question comparison → document library → evidence gaps → security context → Azure retrieval stack → assurance roadmap',
  design:'Vendor evidence workspace',nav:'evidence',gallery:['proofline-server','proofline-network'],galleryAlt:['Data-center server equipment and network cabling','Network switching and infrastructure cables'],
  chapters:[['The question','Keep the buyer’s exact question and required scope visible.'],['The passage','Find the policy language that supports the answer, including exceptions.'],['The assessment','A qualified reviewer accepts the answer or asks for the missing evidence.']],
  azure:[service('documents','Read policies, questionnaires and supporting reports with page and section references.'),service('search','Find relevant policy passages using exact terms and meaning-based retrieval.'),generation('Draft cited answers and explain unclear scope or contradictory evidence.'),service('blob','Version the supplier evidence pack and the accepted review brief.')],
  next:'Connect evidence upload and document indexing; evaluate answer scope and citation accuracy.',pilot:'Have security reviewers compare drafted answers with the source policies and measure unsupported or missed evidence.',reviewRoles:['Information-security review','Procurement operations','Evidence/data protection']
 }
};

export function roadMap(b){
 const plan=productPlans[b.slug];
 return [
  {stage:'01',title:'Product foundation',status:'Built',detail:'Website, review workspace, source citations, report retention, operational register and downloads are implemented.'},
  {stage:'02',title:'Azure model connection',status:'Ready to configure',detail:'Azure OpenAI connector code and configuration checks are implemented. A deployed model, endpoint and server-side credentials are still required.'},
  {stage:'03',title:'Sector data integration',status:'Planned',detail:plan.next},
  {stage:'04',title:'Reviewed field pilot',status:'Planned',detail:plan.pilot},
  {stage:'05',title:'Production operations',status:'Planned',detail:'Implement verified accounts, organization access, audit history, retention controls, monitoring and measured capacity limits before commercial operation.'}
 ];
}
