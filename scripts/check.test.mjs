import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {brands,routes} from '../src/brands.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
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
 assert.ok(new Set(brands.map(b=>b.headingFont)).size>=9);
 assert.equal(brands.filter(b=>b.sector==='Agriculture').length,4);
 assert.equal(brands.filter(b=>b.sector==='Real estate').length,3);
 assert.equal(brands.filter(b=>b.sector==='Security').length,3);
});

test('all 150 brand pages have a title, a single main heading and a disclosure of demo scope',async()=>{
 let count=0;
 for(const brand of brands){
  const htmlFiles=(await files(path.join(docs,brand.slug))).filter(f=>f.endsWith('.html'));
  assert.equal(htmlFiles.length,15);
  for(const filename of htmlFiles){
   const html=await readFile(filename,'utf8');
   assert.match(html,/<html lang="en">/);assert.match(html,/<title>[^<]+<\/title>/);
   assert.equal((html.match(/<h1(?:>| )/g)||[]).length,1,filename);
   assert.match(html,/sample|Sample|DEMO|demonstration/i,filename);
   assert.ok(!/lorem ipsum|TODO|undefined|\{\{BRAND/.test(html),filename);
   count++;
  }
 }
 assert.equal(count,150);
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
