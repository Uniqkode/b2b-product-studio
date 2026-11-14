/* DOM-level integration checks. This does not substitute for visual browser QA. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {brands} from '../src/brands.mjs';
import {enrichBrands} from '../src/ai-briefs.mjs';
enrichBrands(brands);
const {Window}=await import(process.env.B2B_DOM_MODULE||'happy-dom');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const app=await readFile(path.join(root,'src/app.js'),'utf8');
const aiApp=await readFile(path.join(root,'src/ai-workspace.js'),'utf8');
const results=[];
async function screen(brand,route,session=false,savedRecords=null,savedAnalyses=null,fetchImpl=null){
 const window=new Window({url:`https://example.test/b2b-product-studio/${brand.slug}/${route?route+'/':''}`,settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true,navigation:{disableMainFrameNavigation:true,disableChildFrameNavigation:true,disableChildPageNavigation:true}}});
 const html=await readFile(path.join(root,'docs',brand.slug,route,'index.html'),'utf8');
 window.document.write(html);window.BRAND=JSON.parse(JSON.stringify(brand));
 // Happy DOM checks decimal step with binary floating-point modulo. Real browsers
 // accept 12 at step .1; skip only this emulator check while exercising the app's
 // own positive-number / maximum validation and all other form constraints.
 window.document.querySelectorAll('input[type="number"]').forEach(input=>input.step='any');
 if(session)window.sessionStorage.setItem(`b2b:${brand.slug}:session`,JSON.stringify({demo:true}));
 if(savedRecords)window.localStorage.setItem(`b2b:${brand.slug}:records`,savedRecords);
 if(savedAnalyses)window.localStorage.setItem(`b2b:${brand.slug}:analyses`,savedAnalyses);
 const network=[];window.fetch=async(...args)=>{network.push(args);if(fetchImpl)return fetchImpl(...args);throw new Error('An unexpected network request was attempted in prepared sample mode.');};
 const downloads=[];const blobs=new Map();let index=0;
 window.URL.createObjectURL=blob=>{const key='blob:test-'+(++index);blobs.set(key,blob);return key;};
 window.URL.revokeObjectURL=()=>{};
 window.HTMLAnchorElement.prototype.click=function(){if(this.download)downloads.push({filename:this.download,blob:blobs.get(this.href)});};
 window.eval(app);
 window.eval(aiApp);
 return {w:window,d:window.document,downloads,network,close:()=>window.happyDOM.close()};
}
function input(s,selector,value){const node=s.d.querySelector(selector);assert.ok(node,selector);node.value=value;node.dispatchEvent(new s.w.Event('input',{bubbles:true}));}
function change(s,selector,value){const node=s.d.querySelector(selector);node.value=value;node.dispatchEvent(new s.w.Event('change',{bubbles:true}));}
function submit(s,selector){const node=s.d.querySelector(selector);node.dispatchEvent(new s.w.Event('submit',{bubbles:true,cancelable:true}));}
function click(s,selector){const node=s.d.querySelector(selector);assert.ok(node,selector);node.click();}
for(const b of brands){
 let s=await screen(b,'login');
 input(s,'#login-password','incorrect');submit(s,'#login-form');assert.equal(s.d.querySelector('#login-error').hidden,false);
 input(s,'#login-password','MVPdemo2026!');submit(s,'#login-form');assert.equal(JSON.parse(s.w.sessionStorage.getItem(`b2b:${b.slug}:session`)).demo,true);
 await s.close();
 s=await screen(b,'dashboard',true);
 assert.equal(s.d.querySelectorAll('#record-table tbody tr').length,8);
 click(s,'[data-tab="records"]');assert.equal(s.d.querySelector('#panel-records').hidden,false);assert.equal(s.d.querySelector('#panel-overview').hidden,true);
 input(s,'#record-search','no-such-record');assert.ok(s.d.querySelector('#record-table .empty-state'));
 input(s,'#record-search','');change(s,'#status-filter','Needs review');assert.equal(s.d.querySelectorAll('#record-table tbody tr').length,3);
 click(s,'#record-table [data-record]');assert.equal(s.d.querySelector('#record-dialog').open,true);
 input(s,'#detail-note','A sample review note saved by the integration check.');click(s,'#save-note');click(s,'#complete-record');
 assert.equal(s.d.querySelector('#record-dialog').open,false);assert.equal(s.d.querySelectorAll('#record-table tbody tr').length,2);
 let saved=JSON.parse(s.w.localStorage.getItem(`b2b:${b.slug}:records`));assert.equal(saved.filter(r=>r.status===b.finalStatus).length,4);assert.ok(saved.some(r=>r.note.startsWith('A sample review note')));
 const reviewed=saved.find(r=>r.note.startsWith('A sample review note'));
 change(s,'#status-filter','');click(s,`#record-table [data-record="${reviewed.id}"]`);click(s,'#reopen-record');
 assert.equal(JSON.parse(s.w.localStorage.getItem(`b2b:${b.slug}:records`)).find(r=>r.id===reviewed.id).status,'Needs review');
 click(s,'#panel-records .add-record');assert.equal(s.d.querySelector('#add-dialog').open,true);
 input(s,'#add-form [name=name]','QA sample record');input(s,'#add-form [name=place]','Sample location');input(s,'#add-form [name=value]','12');input(s,'#add-form [name=owner]','Sample operator');input(s,'#add-form [name=note]','=HYPERLINK("https://example.test","sample")');submit(s,'#add-form');
 assert.equal(s.d.querySelector('#add-dialog').open,false);
 saved=JSON.parse(s.w.localStorage.getItem(`b2b:${b.slug}:records`));assert.equal(saved.length,9);assert.equal(saved.find(r=>r.name==='QA sample record').status,'Scheduled');
 const summary=s.d.querySelector('#dashboard-stats').textContent;assert.ok(summary.includes('9'));assert.ok(summary.includes((Number(b.primaryMetric.replaceAll(',',''))+12).toLocaleString('en-NG',{maximumFractionDigits:1})));
 input(s,'#record-search','QA sample record');assert.equal(s.d.querySelectorAll('#record-table tbody tr').length,1);
 click(s,'[data-export]');assert.equal(s.downloads.length,1);const csv=await s.downloads[0].blob.text();assert.ok(csv.includes('QA sample record'));assert.ok(csv.includes("'=HYPERLINK"),'Formula cell must be escaped');assert.ok(!csv.includes(b.records[0][1]));
 const persisted=s.w.localStorage.getItem(`b2b:${b.slug}:records`);await s.close();
 s=await screen(b,'dashboard',true,persisted);assert.equal(s.d.querySelectorAll('#record-table tbody tr').length,9);await s.close();
 s=await screen(b,'pricing');click(s,'[data-billing="annual"]');const displayed=s.d.querySelector('[data-price]').textContent;assert.equal(displayed,'₦'+Math.round(b.price*.8).toLocaleString('en-NG'));assert.ok(s.d.querySelector('.billing-detail').textContent.includes('billed annually'));click(s,'[data-billing="monthly"]');assert.equal(s.d.querySelector('[data-price]').textContent,'₦'+b.price.toLocaleString('en-NG'));await s.close();
 s=await screen(b,'');click(s,'.menu-toggle');assert.equal(s.d.querySelector('.menu-toggle').getAttribute('aria-expanded'),'true');await s.close();
 s=await screen(b,'technology');input(s,'[data-workload-slider]','100');assert.ok(s.d.querySelector('[data-workload-calculated]').textContent.includes((100*b.ai.workload.units*b.ai.workload.cycles*b.ai.workload.items).toLocaleString('en-NG')));await s.close();
 s=await screen(b,'contact');for(const [field,value] of Object.entries({name:'Sample User',email:'sample@example.com',organization:'Sample Organization',size:'2–10 operators',priority:'Clearer records',message:'A sample pilot scope with a clear review and handover measure.'})){const node=s.d.querySelector(`[name=${field}]`);node.value=value;}
 s.d.querySelector('[name=consent]').checked=true;submit(s,'#pilot-form');assert.equal(s.d.querySelector('#pilot-result').hidden,false);assert.equal(JSON.parse(s.w.localStorage.getItem(`b2b:${b.slug}:brief`)).organization,'Sample Organization');click(s,'#download-brief');assert.ok((await s.downloads[0].blob.text()).includes('No message has been sent'));
 await s.close();
 results.push({brand:b.name,status:'passed',checks:['invalid and valid demo login','record search and empty state','status filter','note save and completion','reopen','record creation and recalculated totals','filtered CSV and formula escaping','reload persistence','monthly and annual pricing','scenario calculator','menu expansion','local pilot brief and download']});
 console.log(b.name+': 12 interaction groups passed');
}
await writeFile(path.join(root,'qa/interaction-results.json'),JSON.stringify({method:'Happy DOM integration checks; not a visual browser test',products:10,groups:120,results},null,2)+'\n');
console.log('120 interaction groups passed across ten products.');
