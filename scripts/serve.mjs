import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../docs');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const args=process.argv.slice(2);
const portFlag=args.indexOf('--port');
const hostFlag=args.indexOf('--host');
const port=Number(process.env.PORT||(portFlag>=0?args[portFlag+1]:3000));
const host=hostFlag>=0?args[hostFlag+1]:'0.0.0.0';
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let requested=decodeURIComponent(url.pathname).replace(/^\/b2b-product-studio(?=\/|$)/,'');
  let filename=path.resolve(root,'.'+requested);
  if(!filename.startsWith(root+path.sep)&&filename!==root){res.writeHead(403);res.end();return;}
  const info=await stat(filename);if(info.isDirectory()){if(!url.pathname.endsWith('/')){res.writeHead(301,{Location:url.pathname+'/'+url.search});res.end();return;}filename=path.join(filename,'index.html');}
  const data=await readFile(filename);res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(await readFile(path.join(root,'404.html')));}
});
server.listen(port,host,()=>console.log(`Local: http://localhost:${port}`));
