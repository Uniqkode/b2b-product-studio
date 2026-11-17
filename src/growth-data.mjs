/** Product strategies and evaluation plans. These are authored plans, not customer results. */
const metric=(title,measure,method)=>({title,measure,method});
const segment=(name,need,workflow)=>({name,need,workflow});
const method=(name,job,test)=>({name,job,test});

export const growthPlans={
 fieldwell:{
  problemTitle:'The survey is ready. The review takes longer.',
  problem:'A field survey can arrive as hundreds of overlapping images. An agronomist still has to find the relevant area, compare it with the last visit and give the scout a useful next action.',
  friction:['The same stressed area appears in several photographs.','A change in crop colour needs the previous survey for context.','A field visit needs an image, a location and a clear question.'],
  whyTitle:'Make the imagery useful at field level.',
  whyNow:'Drone and scouting images can be collected repeatedly through the growing cycle. The next useful step is a review process that groups the evidence and keeps the agronomist’s judgment close to it.',
  segments:[segment('Commercial growers','Review large surveys without losing the field context.','Upload a dated survey, inspect grouped observations and assign a field visit.'),segment('Agronomy teams','Compare the same field across visits.','Check the image change, add a scout observation and record the next inspection.'),segment('Grower cooperatives','Use a consistent review process across farms.','Keep each grower’s field references and reviewer responsibilities separate.')],
  distribution:'Start with agronomy-led survey reviews and agricultural service partners. Expand by adding authorized fields to an existing review workflow.',
  expansion:'Evaluate neighbouring growing regions only after crop coverage, field references and local agronomy review are established.',
  metrics:[metric('A shorter survey review','Minutes per reviewed survey','Time the complete review, including checking source images and assigning inspections.'),metric('Fewer repeated flags','Duplicate observations per field','Compare grouped observations with the agronomist’s reviewed inspection areas.'),metric('Useful field visits','Reviewed findings linked to inspections','Track whether a flagged area led to an assigned visit and a recorded outcome.')],
  methods:[method('Crop-region segmentation','Separate crop areas from tracks and other image context before comparing coverage.','Evaluate against labelled crop regions; record misses by crop, season and image conditions.'),method('Survey change detection','Compare dated observations for the same field and group overlapping image evidence.','Have agronomists compare candidate changes with authorized field observations.'),method('Source-linked language generation','Turn reviewed observations and scout notes into a concise inspection brief.','Check source references, unsupported conclusions and the usefulness of the next action.')],
  compute:'Batch image inference is a candidate for Azure ML GPU compute after evaluation. Queue each survey, reuse image features and avoid rerunning unchanged evidence. Azure OpenAI writes the review brief after the image work.',
  tool:'survey',toolTitle:'Build the next inspection list.',toolIntro:'Choose the observation types you want to inspect. This view filters the supplied survey records; it does not diagnose a crop.',
  value:{unit:'surveys',volume:80,before:45,after:20,hourly:6500},
  role:'Agronomy-led review',output:'An image-linked inspection list'
 },
 grainledger:{
  problemTitle:'One lot. Several records. One release decision.',
  problem:'A grain lot can have a photo, moisture reading, dispatch ticket and receiving weight in separate places. A quality team needs to compare them before making the release or hold decision.',
  friction:['Visual quality and measured moisture answer different questions.','Dispatch and receiving weights can disagree.','A release decision needs a stable lot reference and recorded review.'],
  whyTitle:'Keep intake evidence together from the start.',
  whyNow:'Standard intake photos and digital scale tickets can become a repeatable quality record. Connecting those inputs makes discrepancies easier to review before a lot moves further through the warehouse.',
  segments:[segment('Grain aggregators','Check many incoming lots consistently.','Match the sample image, moisture observation and weight ticket.'),segment('Warehouse quality teams','Explain a hold or release with evidence.','Read the discrepancy, inspect the physical sample and retain the decision.'),segment('Processors','Review the input before production planning.','Use the lot reference to connect incoming quality evidence with receiving records.')],
  distribution:'Work with warehouse quality leads and grain-service partners. Start with a single intake workflow before expanding across receiving locations.',
  expansion:'Extend to another commodity or country after its sampling, grading and record requirements have been evaluated.',
  metrics:[metric('Faster intake checks','Minutes per reviewed lot','Include ticket comparison, physical sample checks and the recorded release decision.'),metric('Clearer weight reconciliation','Correctly identified ticket differences','Compare extracted values with the actual dispatch and receiving tickets.'),metric('Consistent quality review','Agreement with physical grading','Review model flags against the warehouse’s defined sampling and grading process.')],
  methods:[method('Kernel segmentation and classification','Find candidate broken, discoloured or foreign-material observations in standardized grain images.','Compare flags with physical grading; control lighting, sample size and commodity.'),method('Layout and value extraction','Read lot references, moisture observations and weights from supplied tickets.','Check field extraction and units against the source paperwork.'),method('Cross-record comparison','Connect the photo and extracted readings under the lot reference.','Measure wrong-lot matches, missing inputs and correctly explained discrepancies.')],
  compute:'Use queued document extraction alongside batched image checks. Evaluate GPU inference for standardized sample imagery; the weight comparison itself is deterministic arithmetic. Managed Azure OpenAI prepares the quality brief.',
  tool:'weights',toolTitle:'Check the ticket difference.',toolIntro:'Enter a dispatch weight and receiving weight. The arithmetic identifies the difference; a quality manager decides what it means.',
  value:{unit:'intake lots',volume:250,before:14,after:7,hourly:5000},role:'Warehouse quality review',output:'A reconciled intake brief'
 },
 rill:{
  problemTitle:'A fixed schedule misses changing conditions.',
  problem:'The next watering decision depends on soil conditions, weather, crop stage and pump capacity. A calendar alone cannot explain which zone should receive attention first.',
  friction:['A recent forecast can change the next day’s demand.','Several zones may compete for the same water or pump limit.','The operator needs to compare the plan with actual application.'],
  whyTitle:'Use each new reading in the next plan.',
  whyNow:'Soil readings and weather forecasts become more valuable when they change a dated operating plan. The opportunity is to connect the forecast, the water limit and the operator’s recorded cycle.',
  segments:[segment('Commercial farms','Plan daily allocations across active zones.','Combine soil and crop observations with the next weather period.'),segment('Irrigation cooperatives','Share a limited supply transparently.','Compare zone demand with the agreed daily water budget.'),segment('Irrigation service teams','Check the plan against what was applied.','Record flow-meter observations and investigate differences.')],
  distribution:'Begin with farm irrigation managers and irrigation-service partners. Establish a repeatable operator review before adding devices or growing areas.',
  expansion:'Add climate zones and crops only when the forecast has been evaluated against their local conditions.',
  metrics:[metric('A considered water allocation','Applied volume versus approved plan','Compare operator records and flow-meter readings with the dated zone plan.'),metric('A forecast worth using','Zone demand forecast error','Use time-separated evaluation periods and record missing sensor or weather inputs.'),metric('Less planning overhead','Minutes to approve a daily plan','Include the manager’s review and any changes required by pump or water limits.')],
  methods:[method('Zone-level regression','Estimate demand from recent soil, weather, crop-stage and application observations.','Compare a gradient-boosted baseline with the farm’s existing planning method using time-based validation.'),method('Constraint-aware allocation','Compare estimated demand with the available daily water and pump limit.','Check whether the approved allocations fit the stated operating constraints.'),method('Forecast explanation','Prepare a readable explanation of a zone’s next proposed cycle.','Check that the explanation matches the actual forecast inputs and uncertainty.')],
  compute:'Start with managed Azure ML batch forecasts. A tabular baseline may use CPU inference; use GPU training only if a more complex time-series model demonstrates a useful improvement. Scale recurring zone forecasts and missing-data monitoring independently.',
  tool:'water',toolTitle:'Compare a daily water budget.',toolIntro:'Change the available budget and reserve. This planning tool shows the resulting allocation; it is not a live irrigation command.',
  value:{unit:'daily zone plans',volume:150,before:20,after:9,hourly:6000},role:'Irrigation operations',output:'A reviewed daily zone plan'
 },
 coldline:{
  problemTitle:'The warning matters before the next handover.',
  problem:'A pallet image, temperature excursion and route note can each show part of a shipment’s condition. A receiving operator needs them together to decide what to inspect next.',
  friction:['An excursion can be missed in a long temperature history.','A condition photo needs a shipment and checkpoint reference.','A warning must lead to an operator action, not a vague risk score.'],
  whyTitle:'Review the condition across the journey.',
  whyNow:'Checkpoint images and temperature devices can provide repeated observations during a shipment. Relating those observations to a handover gives the quality team a clearer place to intervene.',
  segments:[segment('Produce exporters','Keep shipment quality evidence connected.','Review collection, transit and receiving observations under one shipment.'),segment('Cold stores','Focus the receiving inspection.','Read the temperature window beside the pallet condition evidence.'),segment('Logistics operators','Explain the route event that needs attention.','Locate the excursion and record the carrier or quality follow-up.')],
  distribution:'Work with produce quality teams and cold-chain operators around a defined handover. Expand through existing logistics and storage workflows.',
  expansion:'Add produce categories and routes only after their condition thresholds and handling requirements have been reviewed.',
  metrics:[metric('Earlier reviewed warnings','Warnings checked before handover','Track the checkpoint, review time and recorded operator response.'),metric('Relevant quality alerts','False and missed warnings','Compare warnings with qualified physical inspections for each produce category.'),metric('A shorter receiving review','Minutes per shipment review','Measure the time to connect the condition image, temperature history and next action.')],
  methods:[method('Produce-image comparison','Find candidate visible changes across authorized checkpoint images.','Validate by produce category, lighting and handling conditions with quality reviewers.'),method('Temperature event detection','Identify excursions against the route’s defined review threshold and duration.','Check sensor gaps, unit handling and correctly located event windows.'),method('Condition brief generation','Connect the visual observation, excursion and shipment reference.','Confirm source accuracy and prevent unsupported release or food-safety conclusions.')],
  compute:'Process checkpoint images in batches and stream device events through IoT Hub. Evaluate GPU-backed vision jobs for larger image volumes. Group repeated events before generating one operator brief; retain evidence according to the shipment policy.',
  tool:'temperature',toolTitle:'Inspect a temperature exception.',toolIntro:'Set the recorded temperature, review threshold and duration. The comparison flags a review question; it does not certify food safety.',
  value:{unit:'shipment reviews',volume:400,before:12,after:6,hourly:5500},role:'Cold-chain quality review',output:'A shipment review with evidence'
 },
 plotmark:{
  problemTitle:'A parcel decision starts with a consistent file.',
  problem:'A title schedule, survey plan and planning document can disagree about the same parcel. Finding the conflict is time-consuming when the evidence spans many pages and versions.',
  friction:['A parcel reference can change between documents.','The area stated in a title and survey may differ.','Missing evidence needs a precise question for a qualified adviser.'],
  whyTitle:'Turn digitized files into reviewable questions.',
  whyNow:'Scanning a file makes it accessible, but does not resolve contradictions within it. Document extraction and source-linked comparison can put the unresolved question beside the passage a lawyer or surveyor needs.',
  segments:[segment('Property developers','Review the acquisition file before a commitment.','Compare document references and keep the unresolved questions in one brief.'),segment('Acquisition teams','Coordinate document follow-up.','Assign an evidence request with the relevant page and source version.'),segment('Professional advisers','Locate the discrepancy quickly.','Read the cited passages and record the professional conclusion.')],
  distribution:'Begin with acquisition teams and their appointed legal/survey advisers. Add document sources through an agreed file-review process.',
  expansion:'Evaluate each new jurisdiction’s document types, professional review and data rules before offering the workflow there.',
  metrics:[metric('A shorter file review','Reviewer minutes per parcel file','Include opening cited pages and preparing the professional follow-up.'),metric('Questions with the right source','Citation correctness','Check parcel references, page numbers, versions and the exact quoted passages.'),metric('Fewer overlooked conflicts','Reviewed discrepancies identified','Compare the generated questions with an authorized professional review.')],
  methods:[method('Document layout extraction','Read supplied page text, tables and document references with retained page context.','Check OCR errors and references against representative title and survey documents.'),method('Parcel and version matching','Find related references and compare dates, areas and versions.','Measure incorrect matches and conflicts that require professional resolution.'),method('Cited review generation','Use hybrid retrieval and structured language output to draft precise questions.','Reject unsupported claims and evaluate quotation accuracy and missing evidence.')],
  compute:'Use Document Intelligence for extraction and AI Search for indexed retrieval. Azure OpenAI performs managed model inference; that does not require claiming a self-managed GPU cluster. Version and cache unchanged pages before processing another review.',
  tool:'parcel',toolTitle:'Compare the two stated areas.',toolIntro:'Enter the area on each supplied schedule. The comparison identifies a discrepancy for professional review; it does not determine title or boundaries.',
  value:{unit:'parcel files',volume:40,before:180,after:75,hourly:12000},role:'Acquisition review',output:'A cited parcel question list'
 },
 leasewell:{
  problemTitle:'The later clause can change the next deadline.',
  problem:'A lease pack can contain schedules and later amendments that change a notice period, rent provision or responsibility. A date without the governing clause is an incomplete action list.',
  friction:['The original wording may have been amended.','An obligation needs a date, source and responsible person.','A portfolio review repeats the same reading task across many agreements.'],
  whyTitle:'Keep the contract in an active workflow.',
  whyNow:'A searchable lease folder is useful, but the operational need is a dated obligation with its source and amendment context. Source-linked extraction can connect the contract to the next property-management conversation.',
  segments:[segment('Property managers','Prepare the next renewal or review conversation.','Keep the date and the clause beside the action owner.'),segment('Asset managers','Review obligations across a portfolio.','See unresolved lease questions without losing the source agreement.'),segment('Lease advisers','Check the interpretation and precedence.','Compare the original wording with the supplied amendment.')],
  distribution:'Start with commercial property managers and their lease advisers. Expand by bringing additional authorized agreements into the same obligation-review process.',
  expansion:'Add jurisdictions and lease structures after local notice rules, document handling and professional review have been established.',
  metrics:[metric('A quicker lease abstract','Minutes per reviewed lease pack','Include amendment checks and the property manager’s follow-up.'),metric('Reliable obligation dates','Date and notice-window correctness','Compare extracted dates and calculations with an appointed lease professional’s review.'),metric('The right clause in view','Amendment changes correctly identified','Track whether later wording is attached to the affected obligation.')],
  methods:[method('Clause and date extraction','Read leases and schedules into a structured obligation record.','Validate extracted dates, amounts and responsibility fields against source pages.'),method('Amendment comparison','Retrieve the original clause and later wording that may replace it.','Check version order and professional judgments on precedence.'),method('Evidence-linked action drafting','Generate a short action with the source and review question.','Measure unsupported recommendations, citation accuracy and notice-calculation correctness.')],
  compute:'Separate page extraction, hybrid clause retrieval and managed Azure OpenAI inference. Cache extracted versions and only reassess obligations when the source changes. Use an operational job queue for portfolio updates rather than rereading every lease for each page view.',
  tool:'notice',toolTitle:'Work back from a review date.',toolIntro:'Choose a reference date and notice period to calculate the preceding date. This is calendar arithmetic; the governing agreement and local rules require review.',
  value:{unit:'lease packs',volume:60,before:100,after:40,hourly:9000},role:'Commercial lease review',output:'A dated obligation brief'
 },
 brickwise:{
  problemTitle:'A folder of photos is not a repair plan.',
  problem:'A building inspection can produce repeated images and notes about the same asset. The facilities team needs a grouped finding, the relevant evidence and a qualified person to approve the next action.',
  friction:['The same defect can produce duplicate work items.','An image without an asset reference is difficult to hand over.','A visible condition does not establish the underlying engineering cause.'],
  whyTitle:'Connect the inspection to the next work order.',
  whyNow:'Technicians can capture photos at the point of inspection. Grouping those observations by asset makes the information useful to the manager who must review, assign and verify the repair.',
  segments:[segment('Facility managers','Prepare a reviewed work list.','Group inspection observations and assign qualified follow-up.'),segment('Building operators','Keep the asset history connected.','Find the original image, technician note and resolution evidence.'),segment('Maintenance contractors','Receive a clearer scope for the visit.','Check the observed condition before approving and completing work.')],
  distribution:'Begin with facilities managers and inspection contractors around a defined building or asset group. Expand after follow-up evidence and work-order ownership are consistent.',
  expansion:'Add asset types and building portfolios after defect labels, professional review and workflow ownership have been evaluated.',
  metrics:[metric('Less repeated work','Duplicate work items per inspection','Compare grouped findings with the manager’s approved asset-level issue list.'),metric('Useful inspection flags','Technician-confirmed findings','Track confirmed observations, missed defects and cases needing more evidence.'),metric('A faster reviewed work list','Minutes from inspection to assignment','Include the qualified review and preparation of an actionable work item.')],
  methods:[method('Visible-defect detection','Identify candidate conditions in asset-labelled inspection images.','Evaluate with qualified technicians across asset types and image conditions.'),method('Near-duplicate grouping','Use image features and asset references to group repeated observations.','Measure incorrect merges and duplicate work items left in the reviewed list.'),method('Repair brief generation','Combine visible evidence and technician notes into a reviewable issue.','Check that the draft does not invent a cause, safety sign-off or professional approval.')],
  compute:'Queue new inspection uploads and evaluate batched GPU image inference where volume justifies it. Reuse image features, group duplicate observations and generate one brief per reviewed asset issue. AKS is an option only if a self-hosted serving requirement warrants it.',
  tool:'maintenance',toolTitle:'Focus the maintenance board.',toolIntro:'Filter the supplied inspection records by review state. Open an item to inspect its source note before using the full workspace.',
  value:{unit:'inspection packs',volume:60,before:90,after:35,hourly:7000},role:'Qualified maintenance review',output:'An evidence-linked work list'
 },
 watchpost:{
  problemTitle:'A continuous feed needs a focused review queue.',
  problem:'A camera network produces long periods of footage. A supervisor needs the event, relevant time window and site rule together, without repeated alerts for the same occurrence.',
  friction:['A single event can generate many repeated frame detections.','The supervisor needs a timestamp and camera reference.','The site must control authorized monitoring and evidence retention.'],
  whyTitle:'Review the event instead of replaying the day.',
  whyNow:'Defined event models can support a bounded review task when they are evaluated against authorized footage. The useful product is a grouped time window that a supervisor can verify, with false and missed events measured.',
  segments:[segment('Security operators','Coordinate an evidence-led supervisor queue.','Group a defined event and retain the reason for review.'),segment('Warehouse supervisors','Check site-specific rules.','Read the camera reference, time window and recorded response.'),segment('Commercial site managers','Set monitoring boundaries.','Define authorized sources, operating hours and retention responsibilities.')],
  distribution:'Work through site security operators with authorized test footage and a defined event rule. Expand only after supervisor evaluation and retention controls are in place.',
  expansion:'Add sites and event categories after measuring missed events, false events and the capacity needed for the chosen sampling rate.',
  metrics:[metric('Fewer repeated alerts','Grouped items per actual event','Compare event windows with supervisor-reviewed occurrences.'),metric('Useful event detection','False and missed events per camera-hour','Evaluate authorized labelled footage by site, lighting and event rule.'),metric('A focused supervisor review','Review minutes per event','Include opening the evidence and recording the site’s response.')],
  methods:[method('Defined-event vision detection','Detect the selected gate state or movement event in sampled frames without recognizing identity.','Use authorized labelled clips and evaluate false/missed events by site condition.'),method('Temporal event grouping','Combine repeated frame observations into one bounded review window.','Measure repeated alerts, incorrectly merged events and clip boundaries.'),method('Supervisor brief generation','Explain the event rule, time window and evidence reference.','Check timestamps, source references, uncertainty and absence of unsupported identity claims.')],
  compute:'Sampled video is the clearest GPU-inference candidate in this collection. Capacity depends on streams × sampled frames per second × model latency. Compare an Azure ML online endpoint with an AKS GPU serving pool, measure both and group events before asking a language model for a brief.',
  tool:'video',toolTitle:'Plan the frame-review workload.',toolIntro:'Change camera count, operating hours and frame sampling rate. This capacity tool does not connect a video feed or claim measured detection performance.',
  value:{unit:'event reviews',volume:500,before:12,after:4,hourly:5000},role:'Site supervision',output:'A timestamped event review'
 },
 gatehouse:{
  problemTitle:'A complete file can still miss the job dates.',
  problem:'A contractor pack can contain an insurance schedule or training certificate that does not cover the planned work. The reviewer needs to compare the evidence with the actual job requirement.',
  friction:['A document can expire before the job ends.','The stated scope may not cover the planned task.','Missing evidence needs a recorded request and an appointed decision maker.'],
  whyTitle:'Read the requirement beside the document.',
  whyNow:'Extracting a date is only useful when it is compared with a job’s dates and scope. A repeatable evidence review can keep changing contractor documents attached to the requirement they are meant to satisfy.',
  segments:[segment('Industrial workplaces','Check the job pack before the work period.','Compare insurance and training evidence with the planned scope.'),segment('Facilities teams','Keep document follow-up in one place.','Record missing evidence and its appointed reviewer.'),segment('Assurance reviewers','Inspect the passage behind each gap.','Confirm the source and record the workplace’s own sign-off decision.')],
  distribution:'Start with appointed workplace and facilities reviewers. Establish one contractor-pack checklist before integrating additional document sources.',
  expansion:'Add industries and jurisdictions only after their evidence requirements, authorized review roles and privacy rules are understood.',
  metrics:[metric('A shorter job-pack review','Minutes per reviewed contractor pack','Include opening the sources and preparing an evidence request.'),metric('Relevant evidence gaps','Correctly identified date/scope gaps','Compare the draft checklist with an appointed workplace reviewer’s findings.'),metric('Clear accountability','Gaps with a named reviewer and follow-up','Track the reviewed request and its recorded resolution.')],
  methods:[method('Document and date extraction','Read supplied schedules and certificates with source references.','Validate extracted scope and dates against authorized documents.'),method('Requirement retrieval and comparison','Match the job requirement with the passage intended to address it.','Check wrong-document matches, expiry handling and unclear scope.'),method('Evidence-request drafting','Explain the missing item in language the reviewer can act on.','Prevent certificate-authenticity claims and automatic permission-to-work decisions.')],
  compute:'Use Document Intelligence, indexed requirement retrieval and managed Azure OpenAI inference. Date coverage is deterministic once the supplied dates have been verified. Cache document versions and enforce restricted evidence access before a real-data rollout.',
  tool:'coverage',toolTitle:'Check the work-period coverage.',toolIntro:'Compare the entered policy expiry with a planned job end date. This date check does not authenticate the document or authorize work.',
  value:{unit:'contractor packs',volume:200,before:25,after:10,hourly:6500},role:'Workplace assurance',output:'A source-linked evidence checklist'
 },
 proofline:{
  problemTitle:'A confident answer still needs the right scope.',
  problem:'A supplier questionnaire may say that a control covers everyone while a policy only describes one group. A reviewer needs the exact question and supporting passage together before accepting the answer.',
  friction:['A policy passage may only partly answer the question.','Different documents can describe conflicting scopes.','Unsupported language can become a confident but inaccurate answer.'],
  whyTitle:'Make the source part of every security answer.',
  whyNow:'Document retrieval and structured language output can help with repeated security-review work. The useful improvement is a precise, cited answer and an explicit evidence gap that the responsible reviewer can check.',
  segments:[segment('Procurement teams','Review a supplier’s evidence consistently.','Connect each buyer question with its supporting document passage.'),segment('Information-security teams','Check answer scope and exceptions.','Review conflicts and request the missing evidence.'),segment('Supplier assurance teams','Prepare evidence-backed responses.','Draft the answer, inspect the citation and retain reviewer acceptance.')],
  distribution:'Start with procurement and security-review teams around a defined questionnaire. Expand through repeat supplier evidence workflows and approved document sources.',
  expansion:'Add markets after the evidence-handling, data-transfer and customer assurance requirements have been reviewed.',
  metrics:[metric('Less repeated policy reading','Reviewer minutes per questionnaire','Include verifying cited passages and resolving unclear answers.'),metric('Supported answers','Unsupported claims per reviewed response','Compare each draft with the source scope and any documented exceptions.'),metric('Citations that stand up to review','Correct document and passage references','Check exact quotations, version handling and whether the question is actually answered.')],
  methods:[method('Layout-aware evidence extraction','Read supplied policies, reports and questionnaires with section references.','Check extraction quality and document-version handling.'),method('Hybrid evidence retrieval','Combine exact terms and meaning-based search to find candidate passages.','Evaluate missed passages, irrelevant retrieval and scope mismatches.'),method('Structured answer generation','Produce a cited answer or an explicit gap for the reviewer.','Check unsupported assertions, quotation accuracy and conflict handling.')],
  compute:'Azure OpenAI provides managed inference for evidence-backed answer generation. Search and extraction scale separately. Cache unchanged policy versions and limit retrieval context; do not manufacture extra model calls to increase token usage.',
  tool:'scope',toolTitle:'Check whether the passage covers the question.',toolIntro:'Choose the required account scope and compare it with the supplied policy extract. This is a guided evidence example, not a security certification.',
  value:{unit:'supplier packs',volume:75,before:180,after:70,hourly:10000},role:'Security evidence review',output:'A cited supplier response'
 }
};

export function attachGrowthPlans(brands,profiles={}){
 for(const b of brands){
  b.growth={...growthPlans[b.slug],market:{initial:['Nigeria'],next:['Ghana','Kenya'],status:'Market strategy',...(profiles.brands?.[b.slug]?.market||{})}};
 }
 return brands;
}
