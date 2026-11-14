import {mkdir,readFile,writeFile,copyFile,cp,rm,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {brands,photoSources} from '../src/brands.mjs';
import * as t from '../src/templates.mjs';
import * as ai from '../src/ai-pages.mjs';
import {enrichBrands} from '../src/ai-briefs.mjs';
import {writeGuides} from './write-guides.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'docs');
enrichBrands(brands);
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
 await writeFile(path.join(site,'assets/fonts.css'),selectedCSS);
 for(const name of new Set([...selectedCSS.matchAll(/url\(([^)]+)\)/g)].map(x=>x[1]))){await copyFile(path.join(root,'src/assets',name),path.join(site,'assets',name));}
 await copyFile(path.join(root,'src/assets',b.image+'.jpg'),path.join(site,'assets/hero.jpg'));
 for(const file of ['style.css','product.css','app.js','ai-workspace.js'])await copyFile(path.join(root,'src',file),path.join(site,'assets',file));
 await writeFile(path.join(site,'assets/logo.svg'),t.standaloneLogo(b));
 await writeFile(path.join(site,'assets/FONT-LICENSES.txt'),licenses);
 await writeFile(path.join(site,'assets/image-sources.json'),JSON.stringify({asset:'hero.jpg',original:photoSources[b.image].original||`https://images.unsplash.com/${b.photoId}`,source:photoSources[b.image].url,credit:b.photoCredit,license:b.photoLicense,description:b.imageAlt,modification:b.slug==='plotmark'?'Resized and JPEG-compressed; CSS crops and graphic overlay applied in the page. Original photograph remains CC BY-SA 4.0.':'Resized for website display.'},null,2)+'\n');
 await writeFile(path.join(site,'assets/config.js'),'window.BRAND = '+JSON.stringify(b).replace(/</g,'\\u003c')+';\n');
 const pages={
  '':ai.home(b),'product':ai.product(b),'technology':ai.technology(b),'pricing':t.pricingPage(b),'about':ai.about(b),'security':t.securityPage(b),'contact':t.contactPage(b),'privacy':t.legalPage(b,'privacy'),'terms':t.legalPage(b,'terms'),'blog':t.blogPage(b),'blog/operating-note':t.blogPage(b,'operating-note'),'blog/working-record':t.blogPage(b,'working-record'),'login':t.loginPage(b),'dashboard':ai.dashboard(b,t.dashboardPage(b))
 };
 for(const [route,html] of Object.entries(pages)){const dir=path.join(site,route);await mkdir(dir,{recursive:true});await writeFile(path.join(dir,'index.html'),html);}
 await writeFile(path.join(site,'404.html'),t.notFoundPage(b));
 await writeFile(path.join(site,'.nojekyll'),'');
 const origin='https://uniqkode.github.io/b2b-product-studio/'+b.slug+'/';
 await writeFile(path.join(site,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+Object.keys(pages).filter(r=>r!=='dashboard'&&r!=='login').map(route=>'<url><loc>'+origin+(route?route+'/':'')+'</loc></url>').join('')+'</urlset>');
 await writeFile(path.join(site,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'sitemap.xml\n');
 await writeFile(path.join(siteRoot,'README.md'),t.brandReadme(b));
 await rm(path.join(out,b.slug),{recursive:true,force:true});await cp(site,path.join(out,b.slug),{recursive:true});
 console.log(`${b.name}: ${Object.keys(pages).length} pages · ${b.records.length} records · ${b.primaryMetric} ${b.unit}`);
}
await writeFile(path.join(out,'index.html'),ai.studio(brands));
await writeFile(path.join(out,'.nojekyll'),'');
await writeFile(path.join(out,'404.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found</title><body style="font:20px system-ui;padding:10%;background:#efede5;color:#25322b"><h1>Let’s get you back to the work.</h1><p>This page isn’t available.</p><a href="/b2b-product-studio/">Explore the ten products →</a></body></html>');
await writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://uniqkode.github.io/b2b-product-studio/sitemap.xml\n');
await writeFile(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+brands.map(b=>`<sitemap><loc>https://uniqkode.github.io/b2b-product-studio/${b.slug}/sitemap.xml</loc></sitemap>`).join('')+'</sitemapindex>');
await writeGuides(root,brands);
await rm(path.join(root,'dist'),{recursive:true,force:true});
await cp(out,path.join(root,'dist'),{recursive:true});
console.log('Built 10 standalone websites and the GitHub Pages collection.');
