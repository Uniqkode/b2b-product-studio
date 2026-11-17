import {mkdir,readFile,writeFile,copyFile,cp,rm,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {brands,photoSources} from '../src/brands.mjs';
import * as t from '../src/templates.mjs';
import * as ai from '../src/ai-pages.mjs';
import {enrichBrands} from '../src/ai-briefs.mjs';
import {writeGuides} from './write-guides.mjs';
import * as bespoke from '../src/bespoke-pages.mjs';
import * as company from '../src/company-pages.mjs';
import * as growth from '../src/growth-pages.mjs';
import {attachGrowthPlans} from '../src/growth-data.mjs';
import {iconize} from '../src/icons.mjs';
import {writeStandaloneKit} from './write-standalone-kit.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'docs');
enrichBrands(brands);
const companyProfiles=JSON.parse(await readFile(path.join(root,'src/company-profiles.json'),'utf8'));
company.attachCompanyProfiles(brands,companyProfiles);
attachGrowthPlans(brands,companyProfiles);
const editorialMedia=JSON.parse(await readFile(path.join(root,'src/assets/editorial/sources.json'),'utf8'));
await mkdir(out,{recursive:true});
const fontCSS=await readFile(path.join(root,'src/assets/fonts.css'),'utf8');
const licenses=await readFile(path.join(root,'src/assets/FONT-LICENSES.txt'),'utf8').catch(()=>`Fonts are distributed by Google Fonts under their open font licenses.\nSources: https://github.com/google/fonts\nFamilies: ${[...new Set(brands.flatMap(b=>[b.headingFont,b.bodyFont]))].join(', ')}\n`);
for(const b of brands){
 b.photoId=photoSources[b.image].id;
 b.photoSourceURL=photoSources[b.image].url;
 b.photoCredit=photoSources[b.image].credit;
 b.photoLicense=photoSources[b.image].license||'https://unsplash.com/license';
 b.photoLicenseName=photoSources[b.image].licenseName||'Unsplash license';
 const siteRoot=path.join(root,'sites',b.slug);
 const site=path.join(siteRoot,'dist');
 await rm(site,{recursive:true,force:true});await mkdir(path.join(site,'assets'),{recursive:true});
 const faces=[...fontCSS.matchAll(/@font-face\s*\{[^}]+\}/g)].map(x=>x[0]).filter(face=>[b.headingFont,b.bodyFont].some(family=>face.includes(`'${family}'`)));
 const selectedCSS=faces.join('\n');
 b.preloadFont=faces.find(face=>face.includes(`'${b.bodyFont}'`)&&/font-weight:\s*400/.test(face))?.match(/url\(([^)]+\.woff2)\)/)?.[1]||null;
 await writeFile(path.join(site,'assets/fonts.css'),selectedCSS);
 for(const name of new Set([...selectedCSS.matchAll(/url\(([^)]+)\)/g)].map(x=>x[1]))){await copyFile(path.join(root,'src/assets',name),path.join(site,'assets',name));}
 await copyFile(path.join(root,'src/assets',b.image+'.jpg'),path.join(site,'assets/hero.jpg'));
 for(const file of ['style.css','product.css','brand-designs.css','growth.css','app.js','ai-workspace.js','brand-interactions.js','growth-interactions.js','planning-math.js'])await copyFile(path.join(root,'src',file),path.join(site,'assets',file));
 const gallery=[];
 for(const [i,name] of b.plan.gallery.entries()){
  const media=editorialMedia.find(item=>item.name===name&&!item.error);if(!media)throw new Error('Missing licensed image: '+name);
  await copyFile(path.join(root,'src/assets/editorial',media.file),path.join(site,'assets',`editorial-${i+1}.jpg`));
  gallery.push({...media,file:`editorial-${i+1}.jpg`,description:b.plan.galleryAlt[i]});
 }
 await copyFile(path.join(root,'src/assets/editorial/maintainer-avatar.jpg'),path.join(site,'assets/maintainer-avatar.jpg'));
 b.photography=gallery;
 await writeFile(path.join(site,'assets/logo.svg'),t.standaloneLogo(b));
 await writeFile(path.join(site,'assets/FONT-LICENSES.txt'),licenses);
 await writeFile(path.join(site,'assets/image-sources.json'),JSON.stringify({asset:'hero.jpg',original:photoSources[b.image].original||`https://images.unsplash.com/${b.photoId}`,source:photoSources[b.image].url,credit:b.photoCredit,license:b.photoLicense,description:b.imageAlt,modification:b.slug==='plotmark'?'Resized and JPEG-compressed; CSS crops and graphic overlay applied in the page. Original photograph remains CC BY-SA 4.0.':'Resized for website display.'},null,2)+'\n');
 await writeFile(path.join(site,'assets/editorial-sources.json'),JSON.stringify(gallery,null,2)+'\n');
 await writeFile(path.join(site,'assets/config.js'),'window.BRAND = '+JSON.stringify(b).replace(/</g,'\\u003c')+';\n');
 const pages={
  '':bespoke.home(b),'home':bespoke.home(b,'home'),'problem':growth.problemPage(b),'solution':growth.solutionPage(b),'market':growth.marketPage(b),'legal':growth.legal(b),'product':bespoke.product(b),'technology':bespoke.technology(b),'Technology':bespoke.technology(b),'pricing':growth.pricing(b),'about':company.about(b),'team':company.team(b),'roadmap':company.roadmap(b),'security':growth.security(b),'contact':growth.contact(b),'privacy':t.legalPage(b,'privacy'),'ai-policy':company.policy(b,'ai'),'data-policy':company.policy(b,'data'),'terms':company.terms(b,t.legalPage(b,'terms')),'blog':t.blogPage(b),'blog/operating-note':t.blogPage(b,'operating-note'),'blog/working-record':t.blogPage(b,'working-record'),'login':t.loginPage(b),'dashboard':ai.dashboard(b,t.dashboardPage(b))
 };
 for(const [route,html] of Object.entries(pages)){const dir=path.join(site,route);await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'index.html'),iconize(html));}
 await writeFile(path.join(site,'404.html'),iconize(t.notFoundPage(b)));
 await writeFile(path.join(site,'.nojekyll'),'');
 const origin=b.company.domain?'https://'+b.company.domain+'/':'https://uniqkode.github.io/b2b-product-studio/'+b.slug+'/';
 await writeFile(path.join(site,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.keys(pages).filter(r=>!['dashboard','login','home','Technology'].includes(r)).map(route=>'<url><loc>'+origin+(route?route+'/':'')+'</loc></url>').join('')+'</urlset>');
 await writeFile(path.join(site,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'sitemap.xml\n');
 await writeFile(path.join(siteRoot,'README.md'),t.brandReadme(b));
 await writeStandaloneKit(root,b);
 await rm(path.join(out,b.slug),{recursive:true,force:true});await cp(site,path.join(out,b.slug),{recursive:true});
 console.log(`${b.name}: ${Object.keys(pages).length} pages · ${b.records.length} records · ${b.primaryMetric} ${b.unit}`);
}
await writeFile(path.join(out,'index.html'),iconize(ai.studio(brands)));
await writeFile(path.join(out,'.nojekyll'),'');
await writeFile(path.join(out,'404.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><body style="font:20px system-ui;padding:10%;background:#efede5;color:#25322b"><h1>Let’s get you back to the work.</h1><p>This page isn’t available.</p><a href="/b2b-product-studio/">Explore the ten products →</a></body></html>');
await writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://uniqkode.github.io/b2b-product-studio/sitemap.xml\n');
await writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+brands.map(b=>`<sitemap><loc>https://uniqkode.github.io/b2b-product-studio/${b.slug}/sitemap.xml</loc></sitemap>`).join('')+'</sitemapindex>');
await writeGuides(root,brands);
await rm(path.join(root,'dist'),{recursive:true,force:true});
await cp(out,path.join(root,'dist'),{recursive:true});
console.log('Built 10 standalone websites and the GitHub Pages collection.');
