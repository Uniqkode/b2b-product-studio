/* DOM integration for the authored field, intake and evidence interfaces. */
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const {Window}=await import(process.env.B2B_DOM_MODULE||'happy-dom');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const script=await readFile(path.join(root,'src/brand-interactions.js'),'utf8');
const results=[];
for(const slug of ['fieldwell','grainledger','proofline'])for(const route of ['','product']){
 const w=new Window({url:`https://example.test/${slug}/${route}`,settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true}});
 w.document.write(await readFile(path.join(root,'docs',slug,route,'index.html'),'utf8'));
 w.eval(await readFile(path.join(root,'docs',slug,'assets/config.js'),'utf8'));w.eval(script);
 const d=w.document,b=w.BRAND;
 if(slug==='fieldwell'){
  d.querySelector('[data-v3-field="4"]').click();
  assert.equal(d.querySelectorAll('[data-v3-field][aria-pressed="true"]').length,1);
  assert.ok(d.querySelector('[data-v3-field-title]').textContent.includes(b.records[4][1]));
  assert.equal(d.querySelector('[data-v3-field-note]').textContent,b.records[4][7]);
  d.querySelector('[data-v3-field="0"]').click();assert.equal(d.querySelector('[data-v3-field="0"]').getAttribute('aria-pressed'),'true');
 }
 if(slug==='grainledger'){
  const filter=d.querySelector('[data-v3-grain-filter]');
  for(const status of ['Needs review','Scheduled','']){
   filter.value=status;filter.dispatchEvent(new w.Event('change',{bubbles:true}));
   const visible=[...d.querySelectorAll('[data-v3-lot-status]')].filter(row=>!row.hidden);
   assert.equal(visible.length,b.records.filter(r=>!status||r[5]===status).length);
   assert.ok(visible.every(row=>!status||row.dataset.v3LotStatus===status));
   assert.ok(d.querySelector('[data-v3-lot-count]').textContent.startsWith(String(visible.length)));
  }
 }
 if(slug==='proofline'){
  for(const i of [1,0]){
   d.querySelector('[data-v3-document="'+i+'"]').click();
   assert.equal(d.querySelectorAll('[data-v3-document][aria-pressed="true"]').length,1);
   assert.equal(d.querySelector('[data-v3-document-copy]').textContent,b.ai.sources[i].excerpt);
   assert.equal(d.querySelector('[data-v3-document-title]').textContent,b.ai.sources[i].name);
  }
 }
 results.push({brand:slug,route:route||'home',status:'passed'});await w.happyDOM.close();
}
await writeFile(path.join(root,'qa/design-interaction-results.json'),JSON.stringify({method:'Happy DOM; no browser rendering',groups:results.length,results},null,2)+'\n');
console.log(results.length+' authored-interface interaction groups passed.');
