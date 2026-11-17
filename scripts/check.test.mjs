import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {brands,routes} from '../src/brands.mjs';
import {enrichBrands} from '../src/ai-briefs.mjs';
import {attachCompanyProfiles,about} from '../src/company-pages.mjs';
enrichBrands(brands);
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const profiles=JSON.parse(await readFile(path.join(root,'src/company-profiles.json'),'utf8'));
attachCompanyProfiles(brands,profiles);
const docs=path.join(root,'docs');
async function files(dir){const results=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);results.push(...(entry.isDirectory()?await files(p):[p]));}return results;}

test('every displayed workspace total reconciles with its eight operational records',()=>{
 for(const brand of brands){
  const actual=brand.records.reduce((sum,row)=>sum+row[3],0);
  const claimed=Number(brand.primaryMetric.replaceAll(',',''));
  assert.ok(Math.abs(actual-claimed)<.000001,`${brand.slug}: ${actual} versus ${claimed}`);
  assert.equal(brand.records.length,8);
  assert.equal(new Set(brand.records.map(r=>r[0])).size,8);
  assert.equal(brand.records.filter(r=>r[5]==='Needs review').length,3);
  for(const row of brand.records){assert.ok(row[3]>0);assert.ok(row[4]>=0&&row[4]<=100);assert.ok(row[7].length>15);}
 }
});

test('ten independent identities include unique marks and deliberate typography and composition',async()=>{
 assert.equal(brands.length,10);
 for(const field of ['slug','name','layout','logoIdea','motif'])assert.equal(new Set(brands.map(b=>b[field])).size,10,field);
 const marks=await Promise.all(brands.map(b=>readFile(path.join(docs,b.slug,'assets/logo.svg'),'utf8')));
 assert.equal(new Set(marks).size,10);
 assert.ok(new Set(brands.map(b=>b.headingFont)).size>=6);
 assert.equal(brands.filter(b=>b.sector==='Agriculture').length,4);
 assert.equal(brands.filter(b=>b.sector==='Real estate').length,3);
 assert.equal(brands.filter(b=>b.sector==='Security').length,3);
});

test('AI workload scenarios reconcile and prepared findings cite supplied evidence',async()=>{
 for(const b of brands){
  const w=b.ai.workload;
  assert.equal(b.ai.volume,w.organizations*w.units*w.cycles*w.items);
  assert.ok(b.ai.volume>=200000);
  const config=await readFile(path.join(docs,b.slug,'assets/config.js'),'utf8');
  assert.ok(config.includes(String(b.ai.volume)));
  for(const f of b.ai.findings){const source=b.ai.sources.find(s=>s.id===f.source);assert.ok(source,`${b.slug}: ${f.source}`);assert.ok(source.excerpt.toLowerCase().includes(f.quote.toLowerCase()),`${b.slug}: quotation ${f.quote}`);}
  const home=await readFile(path.join(docs,b.slug,'index.html'),'utf8');
  assert.match(home,/data-ai-workbench/);assert.match(home,/data-ai-run/);assert.match(home,/Planning scenario/);assert.ok(home.includes('A live AI service is not connected')||home.includes('A live AI service is not connected'.toLowerCase())||home.includes('A live AI service is not connected by default'));
 }
});

test('all 250 brand pages have a title, canonical URL and a single main heading',async()=>{
 let count=0;
 for(const brand of brands){
  const htmlFiles=(await files(path.join(docs,brand.slug))).filter(f=>f.endsWith('.html'));
  assert.equal(htmlFiles.length,25);
  for(const filename of htmlFiles){
   const html=await readFile(filename,'utf8');
   assert.match(html,/<html lang="en">/);assert.match(html,/<title>[^<]+<\/title>/);
   assert.equal((html.match(/<h1(?:>| )/g)||[]).length,1,filename);
   assert.match(html,/<link rel="canonical" href="https:\/\//,filename);
   assert.ok(!/lorem ipsum|TODO|undefined|\{\{BRAND/.test(html),filename);
   count++;
  }
 }
 assert.equal(count,250);
});

test('every local link, image, script and CSS font in all published routes resolves',async()=>{
 const all=await files(docs);
 let links=0;
 for(const filename of all.filter(f=>f.endsWith('.html')||f.endsWith('.css'))){
  const text=await readFile(filename,'utf8');
  const urls=filename.endsWith('.html')?[...text.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]):[...text.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1].replace(/^['"]|['"]$/g,''));
  for(const url of urls){
   if(!url||/^(?:[a-z]+:|#|\/\/)/i.test(url))continue;
   const relative=url.split(/[?#]/)[0];
   if(!relative)continue;
   const target=relative.startsWith('/b2b-product-studio/')?path.join(docs,relative.slice('/b2b-product-studio/'.length)):path.resolve(path.dirname(filename),relative);
   assert.ok(target.startsWith(docs),`Path escapes publish directory: ${filename}: ${url}`);
   const info=await stat(target).catch(()=>null);assert.ok(info,`Broken local reference: ${filename}: ${url}`);
   if(info.isDirectory())assert.ok(await stat(path.join(target,'index.html')).catch(()=>null),`Directory lacks page: ${target}`);
   links++;
  }
 }
 assert.ok(links>2000,`Only ${links} references inspected`);
});

test('all published images are JPEGs and selected fonts are local, with license notices',async()=>{
 for(const brand of brands){
  const assets=path.join(docs,brand.slug,'assets');
  const image=await readFile(path.join(assets,'hero.jpg'));assert.equal(image[0],0xff);assert.equal(image[1],0xd8);assert.ok(image.length>20000);
  const fonts=await readFile(path.join(assets,'fonts.css'),'utf8');assert.ok(fonts.includes(brand.headingFont));assert.ok(fonts.includes(brand.bodyFont));assert.ok(!fonts.includes('https://'));
  const licenses=await readFile(path.join(assets,'FONT-LICENSES.txt'),'utf8');assert.match(licenses,/SIL OPEN FONT LICENSE/);
 }
});

test('every independent site is portable without the collection or a build tool',async()=>{
 for(const brand of brands){
  const standalone=path.join(root,'sites',brand.slug,'dist');
  for(const route of [...routes,'blog/operating-note','blog/working-record']){
   const filename=path.join(standalone,route,'index.html');const content=await readFile(filename,'utf8');
   const published=await readFile(path.join(docs,brand.slug,route,'index.html'),'utf8');assert.equal(content,published);
  }
 }
});

test('the ten homepages use different structures and three attributed industry photographs',async()=>{
 const openings=['field-landscape','grain-masthead','rill-opening','cold-route-opening','plot-file-opening','lease-editorial','brick-opening','watch-opening','gate-dossier-opening','proof-opening'];
 const images=new Set();
 assert.equal(new Set(brands.map(b=>b.plan.composition)).size,10);
 for(const [i,b] of brands.entries()){
  const html=await readFile(path.join(docs,b.slug,'index.html'),'utf8');
  assert.ok(html.includes(openings[i]),b.slug+' opening');
  for(const file of ['hero.jpg','editorial-1.jpg','editorial-2.jpg']){
   assert.ok(html.includes('assets/'+file),b.slug+': '+file);
   const data=await readFile(path.join(docs,b.slug,'assets',file));
   assert.equal(data[0],0xff);assert.equal(data[1],0xd8);images.add(data.toString('base64'));
  }
  const media=JSON.parse(await readFile(path.join(docs,b.slug,'assets/editorial-sources.json'),'utf8'));
  assert.equal(media.length,2);
  const terms=await readFile(path.join(docs,b.slug,'terms/index.html'),'utf8');
  for(const item of media){assert.ok(item.source&&item.author&&item.license);assert.ok(terms.includes(item.source.replaceAll('&','&amp;')));}
 }
 assert.equal(images.size,30,'Each industry photo must be a separate asset');
});

test('company pages expose the real maintainer and omit unverified registration',async()=>{
 for(const b of brands){
  const team=await readFile(path.join(docs,b.slug,'team/index.html'),'utf8');
  assert.ok(team.includes('Precious Arinze')&&team.includes('https://github.com/Uniqkode'));
  const contact=await readFile(path.join(docs,b.slug,'contact/index.html'),'utf8');
  assert.ok(contact.includes('/issues/new?title=')&&contact.includes('GitHub enquiry will be public'));
  const company=await readFile(path.join(docs,b.slug,'about/index.html'),'utf8');
  assert.ok(!/RC[ -]?\d{3,}/.test(company));
  assert.equal(b.company.rcNumber,null);
 }
 const brand=structuredClone(brands[0]);
 const fake=structuredClone(profiles);fake.brands.fieldwell={legalName:'Unverified legal name',rcNumber:'RC0000000',registrationVerified:false};
 attachCompanyProfiles([brand],fake);assert.ok(!about(brand).includes('RC0000000'));
 fake.brands.fieldwell.registrationVerified=true;
 assert.throws(()=>attachCompanyProfiles([brand],fake),/evidence reference/);
});

test('commercial content and functional explorers exist without fake live-traction claims',async()=>{
 const kinds=new Set();
 for(const b of brands){
  const home=await readFile(path.join(docs,b.slug,'index.html'),'utf8');
  for(const label of ['WHY NOW','MARKET OPPORTUNITY','OUTCOMES TO MEASURE','PRODUCT STATUS','data-value-planner','data-domain-tool','data-market-tab'])assert.ok(home.includes(label),b.slug+': '+label);
  assert.ok(!home.includes('Workspace preview')&&!home.includes('class="demo-ribbon"'));
  assert.ok(!/2,400\+ active teams|1,200.*processed today|99\.9% uptime|All systems operational/.test(home));
  kinds.add(home.match(/data-domain-tool="([^"]+)"/)[1]);
  const technology=await readFile(path.join(docs,b.slug,'technology/index.html'),'utf8');
  for(const text of ['AI TECHNOLOGY','COMPUTE CHOICE','data-pipeline-tab','Azure Key Vault','Microsoft Entra ID','Azure Private Link'])assert.ok(technology.includes(text),b.slug+': '+text);
  for(const route of ['home','problem','solution','market','legal','Technology'])assert.ok((await readFile(path.join(docs,b.slug,route,'index.html'),'utf8')).length>1000);
  const fonts=await readFile(path.join(docs,b.slug,'assets/fonts.css'),'utf8');assert.match(fonts,/format\('woff2'\)/);
  for(const [,name] of fonts.matchAll(/url\(([^)]+)\)/g))assert.equal((await readFile(path.join(docs,b.slug,'assets',name))).subarray(0,4).toString(),'wOF2');
 }
 assert.equal(kinds.size,10);
});

test('unverified contact, booking and domain values remain unpublished',()=>{
 const brand=structuredClone(brands[0]),settings=structuredClone(profiles);
 settings.brands.fieldwell={contactEmail:'placeholder@example.com',bookingUrl:'https://calendly.com/YOUR-LINK/demo',domain:'example.com'};
 attachCompanyProfiles([brand],settings);
 for(const key of ['contactEmail','bookingUrl','domain'])assert.equal(brand.company[key],null);
 settings.brands.fieldwell.bookingVerified=true;settings.brands.fieldwell.bookingUrl='javascript:alert(1)';
 assert.throws(()=>attachCompanyProfiles([brand],settings),/HTTPS booking URL/);
 settings.brands.fieldwell.bookingVerified=false;settings.brands.fieldwell.contactVerified=true;settings.brands.fieldwell.contactEmail='invalid';
 assert.throws(()=>attachCompanyProfiles([brand],settings),/valid email/);
});

test('each standalone kit has its own product-restricted AI adapter and Azure deployment template',async()=>{
 for(const b of brands){
  const kit=path.join(root,'sites',b.slug);
  const api=await import(pathToFileURL(path.join(kit,'service/ai-service.mjs')));
  const input={brand:b.slug,inputs:[{id:'S1',name:'Test source',kind:'text',text:'A supplied source for a product-boundary check.'}]};
  assert.equal(api.validateInputs(input).brand,b.slug);
  const other=brands.find(x=>x.slug!==b.slug).slug;
  assert.throws(()=>api.validateInputs({...input,brand:other}),/supported product/);
  const template=await readFile(path.join(kit,'deployment/azure-static-web-apps.yml.example'),'utf8');
  assert.ok(template.includes('secrets.AZURE_STATIC_WEB_APPS_API_TOKEN')&&template.includes('skip_app_build: true'));
  const config=JSON.parse(await readFile(path.join(kit,'dist/staticwebapp.config.json'),'utf8'));
  assert.equal(config.globalHeaders['X-Content-Type-Options'],'nosniff');
 }
});

test('roadmaps distinguish built code from planned Azure services and pilots',async()=>{
 for(const b of brands){
  const roadmap=await readFile(path.join(docs,b.slug,'roadmap/index.html'),'utf8');
  for(const stage of b.roadmap){assert.ok(roadmap.includes(stage.title));assert.ok(roadmap.includes(stage.status));}
  assert.equal(b.roadmap.length,5);assert.equal(b.roadmap.filter(s=>s.status==='Built').length,1);
  const technology=await readFile(path.join(docs,b.slug,'technology/index.html'),'utf8');
  for(const service of b.plan.azure){assert.ok(technology.includes(service.name));assert.ok(technology.includes(service.url.replaceAll('&','&amp;')));assert.ok(technology.includes(service.status));}
  assert.ok(technology.includes('Azure resources: configuration required'));
 }
});
