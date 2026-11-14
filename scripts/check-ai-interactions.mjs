/* Exercise evidence review and the connected-service boundary without paid AI calls. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {brands} from '../src/brands.mjs';
import {enrichBrands} from '../src/ai-briefs.mjs';
const {Window}=await import(process.env.B2B_DOM_MODULE||'happy-dom');
enrichBrands(brands);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const app=await readFile(path.join(root,'src/app.js'),'utf8');
const aiApp=await readFile(path.join(root,'src/ai-workspace.js'),'utf8');
const results=[];
async function screen(brand,route='',history=null,fetchImpl=null){
 const w=new Window({url:`https://example.test/b2b-product-studio/${brand.slug}/${route?route+'/':''}`,settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true,navigation:{disableMainFrameNavigation:true}}});
 w.document.write(await readFile(path.join(root,'docs',brand.slug,route,'index.html'),'utf8'));w.BRAND=JSON.parse(JSON.stringify(brand));
 if(route==='dashboard')w.sessionStorage.setItem(`b2b:${brand.slug}:session`,JSON.stringify({demo:true}));
 if(history)w.localStorage.setItem(`b2b:${brand.slug}:analyses`,history);
 const requests=[],downloads=[],blobs=new Map();let sequence=0;
 w.fetch=async(...args)=>{requests.push(args);if(!fetchImpl)throw new Error('Prepared samples must not send a network request.');return fetchImpl(...args);};
 w.URL.createObjectURL=blob=>{const key='blob:qa-'+(++sequence);blobs.set(key,blob);return key;};w.URL.revokeObjectURL=()=>{};
 w.HTMLAnchorElement.prototype.click=function(){if(this.download)downloads.push({name:this.download,blob:blobs.get(this.href)});};
 w.eval(app);w.eval(aiApp);
 return {w,d:w.document,requests,downloads,close:()=>w.happyDOM.close()};
}
function click(s,selector){const node=s.d.querySelector(selector);assert.ok(node,selector);node.click();}
function value(s,selector,text,event='input'){const node=s.d.querySelector(selector);assert.ok(node,selector);node.value=text;node.dispatchEvent(new s.w.Event(event,{bubbles:true}));}
async function settle(s){await s.w.happyDOM.waitUntilComplete();}

for(const brand of brands){
 let s=await screen(brand);
 assert.equal(s.d.querySelector('[data-ai-report-actions]').hidden,true);
 click(s,'[data-ai-run]');assert.equal(s.d.querySelectorAll('.ai-finding').length,2);assert.equal(s.requests.length,0);
 click(s,'[data-ai-citation="1"]');assert.equal(s.d.querySelector('[data-source="'+brand.ai.findings[1].source+'"]').getAttribute('aria-pressed'),'true');assert.ok(s.d.querySelector('[data-ai-excerpt] mark'));
 click(s,'[data-ai-accept]');assert.equal(s.d.querySelector('[data-ai-accept]').disabled,true);
 let history=JSON.parse(s.w.localStorage.getItem(`b2b:${brand.slug}:analyses`));assert.equal(history.length,1);assert.equal(history[0].mode,'sample');assert.equal(history[0].accepted,true);
 click(s,'[data-ai-download]');assert.ok((await s.downloads[0].blob.text()).includes('Prepared sample report'));assert.ok((await s.downloads[0].blob.text()).includes(brand.ai.sources[1].name));
 value(s,'[data-ai-case]','alternate','change');assert.equal(s.d.querySelector('[data-ai-report-actions]').hidden,true);assert.equal(s.d.querySelectorAll('[data-source]').length,1);
 click(s,'[data-ai-run]');assert.equal(s.d.querySelectorAll('.ai-finding').length,1);assert.ok(s.d.querySelector('[data-ai-output]').textContent.includes(brand.ai.alternate.finding.title));click(s,'[data-ai-accept]');
 const retained=s.w.localStorage.getItem(`b2b:${brand.slug}:analyses`);history=JSON.parse(retained);assert.equal(history.length,2);assert.notEqual(history[0].id,history[1].id);assert.equal(s.requests.length,0);
 await s.close();
 s=await screen(brand,'dashboard',retained);assert.equal(s.d.querySelectorAll('.ai-history-item').length,2);click(s,'[data-ai-history-export="0"]');assert.ok((await s.downloads[0].blob.text()).includes(brand.ai.alternate.name));await s.close();

 const liveReport={title:'Connected test review',summary:'<script>Never execute model text</script>',findings:[{title:'Check the entered evidence',level:'Review',source:'S1',quote:'The notice period is 120 days.',action:'A reviewer should confirm the deadline.'}]};
 s=await screen(brand,'dashboard',null,async(url,options)=>{
  if(url.endsWith('/api/health'))return {json:async()=>({configured:true})};
  assert.equal(options.headers.Authorization,'Bearer test-service-access');const body=JSON.parse(options.body);assert.equal(body.brand,brand.slug);assert.equal(body.inputs[0].text,'The notice period is 120 days.');
  return {ok:true,json:async()=>({report:liveReport,usage:{input_tokens:25,output_tokens:40},cached:false})};
 });
 value(s,'[data-ai-endpoint]','https://ai-service.example');value(s,'[data-ai-service-token]','test-service-access');value(s,'[data-ai-custom-text]','The notice period is 120 days.');click(s,'[data-ai-live-run]');await settle(s);
 assert.equal(s.requests.length,2);assert.equal(s.d.querySelectorAll('.ai-finding').length,1);assert.equal(s.d.querySelector('[data-ai-output] script'),null);assert.ok(s.d.querySelector('[data-ai-output]').textContent.includes('25 input tokens'));
 click(s,'[data-ai-accept]');history=JSON.parse(s.w.localStorage.getItem(`b2b:${brand.slug}:analyses`));assert.equal(history[0].mode,'live');assert.ok(!JSON.stringify(history).includes('test-service-access'));
 await s.close();
 s=await screen(brand,'dashboard',null,async()=>({json:async()=>({configured:false})}));value(s,'[data-ai-endpoint]','https://ai-service.example');value(s,'[data-ai-custom-text]','Non-sensitive test evidence.');click(s,'[data-ai-live-run]');await settle(s);assert.equal(s.requests.length,1);assert.equal(s.d.querySelector('[data-ai-live-run]').disabled,false);assert.ok(s.d.querySelector('[data-ai-status]').textContent.includes('no AI key'));await s.close();
 results.push({brand:brand.name,status:'passed',groups:['prepared run and no network calls','source citation and exact highlight','retained human-review state','report export with evidence','alternate case and distinct report','history restoration and export','connected analysis boundary, usage and safe rendering','unconfigured service error and recovery']});
 console.log(brand.name+': 8 AI interaction groups passed');
}
await writeFile(path.join(root,'qa/ai-interaction-results.json'),JSON.stringify({method:'Happy DOM; connected responses mocked; no paid AI requests',products:10,groups:80,results},null,2)+'\n');
console.log('80 AI interaction groups passed.');
