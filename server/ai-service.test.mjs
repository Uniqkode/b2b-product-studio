import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createAIService,validateInputs,callProvider} from './ai-service.mjs';

const evidence={brand:'leasewell',inputs:[{id:'S1',name:'Lease amendment',kind:'text',text:'The notice period is 120 days. Annual rent is ₦30,000,000.'}]};
const report={title:'Notice review',summary:'Confirm the revised notice period.',findings:[{title:'Use the amended notice period',level:'Review',source:'S1',quote:'The notice period is 120 days.',action:'Ask the appointed reviewer to confirm the deadline.'}]};
async function start(t,options={}){
 const server=createAIService(options);server.listen(0,'127.0.0.1');await once(server,'listening');
 t.after(()=>new Promise(resolve=>{server.close(resolve);server.closeAllConnections();}));
 return 'http://127.0.0.1:'+server.address().port;
}
const post=(base,body=evidence,headers={})=>fetch(base+'/api/analyze',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});

test('an unconfigured service exposes no credentials and makes no AI request',async t=>{
 let calls=0;const base=await start(t,{key:'',provider:async()=>{calls++;return {};}});
 const health=await fetch(base+'/api/health').then(r=>r.json());assert.equal(health.configured,false);assert.equal(Object.hasOwn(health,'key'),false);
 assert.equal((await post(base)).status,503);assert.equal(calls,0);
});
test('service authentication and explicit browser origins are enforced',async t=>{
 const base=await start(t,{key:'test-provider-key',accessToken:'test-service-access-token',origins:['https://allowed.example'],provider:async()=>({report,usage:{input_tokens:20,output_tokens:30},model:'test'})});
 assert.equal((await post(base)).status,401);
 assert.equal((await post(base,evidence,{Authorization:'Bearer incorrect'})).status,401);
 assert.equal((await post(base,evidence,{Origin:'https://blocked.example',Authorization:'Bearer test-service-access-token'})).status,403);
 const success=await post(base,evidence,{Origin:'https://allowed.example',Authorization:'Bearer test-service-access-token'});
 assert.equal(success.status,200);assert.equal(success.headers.get('access-control-allow-origin'),'https://allowed.example');
 assert.ok(!JSON.stringify(await success.json()).includes('test-provider-key'));
});
test('identical evidence is cached while changed evidence is analyzed again',async t=>{
 let calls=0;const base=await start(t,{key:'test-key',provider:async()=>{calls++;return {report,usage:{input_tokens:30,output_tokens:40},model:'test'};}});
 const first=await post(base).then(r=>r.json());const second=await post(base).then(r=>r.json());
 assert.equal(first.cached,false);assert.equal(second.cached,true);assert.equal(calls,1);
 const changed=structuredClone(evidence);changed.inputs[0].text+=' Revised on 14 November.';
 assert.equal((await post(base,changed)).status,200);assert.equal(calls,2);
});
test('overlapping identical requests share the same in-flight analysis',async t=>{
 let calls=0;const base=await start(t,{key:'test-key',provider:async()=>{calls++;await new Promise(resolve=>setTimeout(resolve,25));return {report,usage:{input_tokens:30,output_tokens:40},model:'test'};}});
 const responses=await Promise.all([post(base),post(base)]);
 assert.ok(responses.every(r=>r.status===200));assert.equal(calls,1);
});
test('unsupported brands, duplicate references and invalid file content are rejected',()=>{
 assert.throws(()=>validateInputs({...evidence,brand:'unknown'}));
 assert.throws(()=>validateInputs({...evidence,inputs:[evidence.inputs[0],evidence.inputs[0]]}));
 assert.throws(()=>validateInputs({...evidence,inputs:[{id:'I1',name:'wrong.jpg',kind:'image',image:'data:image/jpeg;base64,'+Buffer.from('This is a text file.').toString('base64')}]}));
 assert.throws(()=>validateInputs({...evidence,inputs:[{...evidence.inputs[0],text:'a'.repeat(30001)}]}));
 assert.equal(validateInputs(evidence).inputs[0].text,evidence.inputs[0].text);
});
test('provider requests are bounded, structured and contain only the supplied sources',async()=>{
 let request;
 const result=await callProvider({...evidence,key:'test-key',model:'test-model',fetchImpl:async(url,options)=>{
  assert.equal(url,'https://api.openai.com/v1/responses');request=JSON.parse(options.body);
  return {ok:true,json:async()=>({output:[{content:[{type:'output_text',text:JSON.stringify(report)}]}],usage:{input_tokens:76,output_tokens:82}})};
 }});
 assert.equal(request.store,false);assert.equal(request.max_output_tokens,2200);assert.equal(request.text.format.strict,true);
 assert.ok(request.input[0].content[1].text.includes('SOURCE S1'));assert.ok(request.instructions.includes('untrusted')||request.input[0].content[0].text.includes('untrusted'));
 assert.equal(result.report.findings[0].source,'S1');assert.equal(result.usage.input_tokens,76);
});
test('invented sources and quotations are rejected before a report is returned',async()=>{
 for(const finding of [{...report.findings[0],source:'S99'},{...report.findings[0],quote:'This passage is not in the source.'}]){
  await assert.rejects(callProvider({...evidence,key:'test-key',model:'test',fetchImpl:async()=>({ok:true,json:async()=>({output:[{content:[{type:'output_text',text:JSON.stringify({...report,findings:[finding]})}]}]})})}));
 }
});
