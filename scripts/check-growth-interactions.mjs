/* Integration of value arithmetic, ten domain tools, accessible tabs and enquiry handoff. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as planning from '../src/planning-math.js';
const {Window}=await import(process.env.B2B_DOM_MODULE||'happy-dom');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const script=(await readFile(path.join(root,'src/growth-interactions.js'),'utf8')).replace("import * as planning from './planning-math.js';",'const planning=window.PlanningMath;');
const results=[];
const slugs=['fieldwell','grainledger','rill','coldline','plotmark','leasewell','brickwise','watchpost','gatehouse','proofline'];
async function screen(slug,route=''){
 const w=new Window({url:`https://example.test/${slug}/${route}`,settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true,navigation:{disableMainFrameNavigation:true}}});
 w.document.write(await readFile(path.join(root,'docs',slug,route,'index.html'),'utf8'));
 w.eval(await readFile(path.join(root,'docs',slug,'assets/config.js'),'utf8'));w.PlanningMath=planning;
 const downloads=[],blobs=new Map();let id=0;
 w.fetch=()=>{throw new Error('These interactions must not make a network or paid AI request.');};
 w.URL.createObjectURL=blob=>{const url='blob:qa-'+(++id);blobs.set(url,blob);return url;};w.URL.revokeObjectURL=()=>{};
 w.HTMLAnchorElement.prototype.click=function(){if(this.download)downloads.push({name:this.download,blob:blobs.get(this.href)});};
 w.eval(script);return {w,d:w.document,b:w.BRAND,downloads,close:()=>w.happyDOM.close()};
}
const set=(s,q,value,event='input')=>{const n=s.d.querySelector(q);assert.ok(n,q);n.value=String(value);n.dispatchEvent(new s.w.Event(event,{bubbles:true}));};
const click=(s,q)=>{const n=s.d.querySelector(q);assert.ok(n,q);n.click();};
const text=(s,q)=>s.d.querySelector(q).textContent;
for(const slug of slugs){
 let s=await screen(slug);
 for(const [name,value] of Object.entries({volume:120,before:160,after:40,hourly:6000}))set(s,'[data-value="'+name+'"]',value);
 assert.equal(text(s,'[data-value-hours]'),'240');assert.equal(text(s,'[data-value-cost]'),'₦1,440,000');
 click(s,'[data-value-export]');assert.ok((await s.downloads[0].blob.text()).includes('not measured product or customer results'));
 set(s,'[data-value="volume"]',0);assert.equal(s.d.querySelector('[data-value-export]').disabled,true);assert.ok(text(s,'[data-value-error]').includes('valid'));
 set(s,'[data-value="volume"]',120);set(s,'[data-value="after"]',200);assert.ok(text(s,'[data-value-direction]').includes('Additional time'));assert.ok(text(s,'[data-value-cost]').startsWith('+'));
 click(s,'[data-market-tab="1"]');assert.equal(s.d.querySelector('[data-market-panel="1"]').hidden,false);assert.equal(s.d.querySelector('[data-market-panel="0"]').hidden,true);
 const active=s.d.querySelector('[data-market-tab="1"]');active.dispatchEvent(new s.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.equal(s.d.querySelector('[data-market-tab="2"]').getAttribute('aria-selected'),'true');
 const kind=s.b.growth.tool;
 if(kind==='survey'||kind==='maintenance'){
  set(s,'[data-tool-filter]','Needs review','change');assert.equal(s.d.querySelectorAll('[data-tool-record]').length,3);
  const record=s.b.records.filter(r=>r[5]==='Needs review')[1];click(s,'[data-tool-record="'+record[0]+'"]');assert.ok(text(s,'[data-tool-detail]').includes(record[7]));
 }
 if(kind==='weights'){set(s,'[data-tool-input="dispatch"]',40);set(s,'[data-tool-input="received"]',38);assert.equal(text(s,'[data-tool-value]'),'2 tonnes');assert.ok(text(s,'[data-tool-note]').includes('5%'));}
 if(kind==='water'){set(s,'[data-tool-input="budget"]',1000);set(s,'[data-tool-input="reserve"]',20);assert.equal(text(s,'[data-tool-value]'),'800 m³');set(s,'[data-tool-input="reserve"]',101);assert.ok(text(s,'[data-tool-note]').includes('valid'));}
 if(kind==='temperature'){set(s,'[data-tool-input="reading"]',8);assert.equal(text(s,'[data-tool-value]'),'2°C above');set(s,'[data-tool-input="duration"]',0);assert.equal(text(s,'[data-tool-value]'),'No duration entered');}
 if(kind==='parcel'){set(s,'[data-tool-input="survey"]',10);set(s,'[data-tool-input="title"]',9);assert.equal(text(s,'[data-tool-value]'),'1 ha');assert.ok(text(s,'[data-tool-note]').includes('10%'));}
 if(kind==='notice'){set(s,'[data-tool-input="reference"]','2028-03-01');set(s,'[data-tool-input="notice"]',90,'change');assert.equal(text(s,'[data-tool-value]'),'2 Dec 2027');}
 if(kind==='video'){set(s,'[data-tool-input="cameras"]',10);set(s,'[data-tool-input="hours"]',24);set(s,'[data-tool-input="fps"]',1,'change');assert.equal(text(s,'[data-tool-value]'),'864,000');}
 if(kind==='coverage'){set(s,'[data-tool-input="expiry"]','2026-11-20');assert.equal(text(s,'[data-tool-value]'),'1 work day');set(s,'[data-tool-input="expiry"]','2026-11-21');assert.equal(text(s,'[data-tool-value]'),'End date covered');}
 if(kind==='scope'){set(s,'[data-tool-input="scope"]','administrators','change');assert.equal(text(s,'[data-tool-value]'),'Administrator scope');set(s,'[data-tool-input="scope"]','all','change');assert.equal(text(s,'[data-tool-value]'),'Clarification needed');}
 await s.close();
 s=await screen(slug,'solution');click(s,'[data-tour-next]');assert.equal(text(s,'[data-tour-title]'),s.b.ai.stages[1][0]);click(s,'[data-tour-step="3"]');assert.equal(text(s,'[data-tour-position]'),'04 / 04');click(s,'[data-tour-next]');assert.equal(text(s,'[data-tour-position]'),'01 / 04');await s.close();
 s=await screen(slug,'technology');click(s,'[data-pipeline-tab="3"]');assert.equal(s.d.querySelector('[data-pipeline-panel="3"]').hidden,false);assert.equal(s.d.querySelector('[data-pipeline-panel="0"]').hidden,true);assert.ok(text(s,'[data-pipeline-panel="3"]').includes('Azure Key Vault'));await s.close();
 s=await screen(slug,'contact');const form=s.d.querySelector('[data-enquiry-form]');form.elements.organization.value='Public example team';form.elements.message.value='Please discuss our document review workflow and outcome measures.';
 form.dispatchEvent(new s.w.Event('submit',{bubbles:true,cancelable:true}));assert.equal(s.d.querySelector('[data-enquiry-preview]').hidden,true);
 form.elements.consent.checked=true;form.dispatchEvent(new s.w.Event('submit',{bubbles:true,cancelable:true}));assert.equal(s.d.querySelector('[data-enquiry-preview]').hidden,false);
 const destination=new URL(s.d.querySelector('[data-enquiry-send]').href);assert.equal(destination.origin,'https://github.com');assert.ok(destination.searchParams.get('body').includes('Public example team'));assert.ok(text(s,'[data-enquiry-preview]').includes('No message has been sent'));assert.ok(!text(s,'[data-enquiry-copy]').includes('<script>'));
 await s.close();
 results.push({brand:slug,status:'passed',groups:['value plan reconciliation and export','invalid and adverse planning inputs','market tab state and keyboard control','product-specific explorer','workflow tour progression','infrastructure tab selection','enquiry consent enforcement','enquiry handoff and truthful delivery status']});
 console.log(slug+': 8 growth interaction groups passed');
}
await writeFile(path.join(root,'qa/growth-interaction-results.json'),JSON.stringify({method:'Happy DOM; no network or paid model calls',products:10,groups:80,results},null,2)+'\n');
console.log('80 product interaction groups passed.');
