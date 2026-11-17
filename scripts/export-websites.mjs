/** Sync generated kits into the ten independent Git folders without losing their histories. */
import {readFile,writeFile,mkdir,cp,rm,readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const destination=path.dirname(root);
const commit=process.argv.includes('--commit');
const slugs=['fieldwell','grainledger','rill','coldline','plotmark','leasewell','brickwise','watchpost','gatehouse','proofline'];
const git=(dir,...args)=>execFileSync('git',['-C',dir,...args],{encoding:'utf8'}).trim();
const prior=JSON.parse(await readFile(path.join(destination,'repositories.json'),'utf8'));
// Preflight every destination before changing any one of them.
for(const slug of slugs){
 const dir=path.join(destination,slug),expected='https://github.com/Uniqkode/'+slug+'.git';
 if(!existsSync(path.join(dir,'.git')))throw new Error(slug+': an independent Git repository is required.');
 if(git(dir,'remote','get-url','origin')!==expected)throw new Error(slug+': review its origin before exporting.');
 if(git(dir,'status','--porcelain'))throw new Error(slug+': preserve or commit its local edits before exporting.');
}
for(const slug of slugs){
 const dir=path.join(destination,slug),kit=path.join(root,'sites',slug);
 // Only remove files belonging to the prior tracked export. Preserve ignored
 // local secrets, logs and other owner files rather than clearing the directory.
 for(const file of git(dir,'ls-files').split('\n').filter(Boolean))if(file!=='.gitignore')await rm(path.join(dir,file),{force:true});
 await cp(path.join(kit,'dist'),dir,{recursive:true});
 for(const name of ['service','deployment','package.json','.env.azure.example'])await cp(path.join(kit,name),path.join(dir,name),{recursive:true});
 await cp(path.join(root,'OWNER_SETUP.md'),path.join(dir,'OWNER_SETUP.md'));
 let readme=await readFile(path.join(kit,'README.md'),'utf8');
 readme=readme.replaceAll('`dist/assets/','`assets/').replace('Serve `dist/` using any static HTTP server.','Serve this folder using any static HTTP server, for example `python3 -m http.server 8080`, then open http://localhost:8080/.').replaceAll('(../../server/README.md)','(https://github.com/Uniqkode/b2b-product-studio/blob/main/server/README.md)').replaceAll('(../../OWNER_SETUP.md)','(OWNER_SETUP.md)');
 readme+='\n## Dedicated repository\n\nPrepared destination: `Uniqkode/'+slug+'`. The homepage and assets are at the repository root. The optional Node model adapter is in `service/`; Azure deployment instructions are in `deployment/`.\n';
 await writeFile(path.join(dir,'README.md'),readme);
 const ignore='.DS_Store\nnode_modules/\n.env\n.env.*\n!.env.example\n!.env.azure.example\n*.log\n';await writeFile(path.join(dir,'.gitignore'),ignore);
 if(commit){git(dir,'add','--all');if(git(dir,'status','--porcelain'))git(dir,'commit','--quiet','-m','Complete product content, interactive workflows and standalone launch kit');}
 const item=prior.repositories.find(r=>r.slug===slug);item.commit=git(dir,'rev-parse','HEAD');item.files=git(dir,'ls-files').split('\n').length;item.pushed=false;
 console.log(slug+': exported'+(commit?' and committed':'')+'; Git history preserved.');
}
prior.status='Updated product kits are committed locally; separate remote repositories require creation/access before pushing.';
await writeFile(path.join(destination,'repositories.json'),JSON.stringify(prior,null,2)+'\n');
