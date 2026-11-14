import {esc} from './html.mjs';
export function articleBody(b,index){
 const a=b.ai;
 return `<p class="article-lead">${esc(index?a.scope:b.promise)}</p><h2>${index?'Start with the limits of the evidence.':'Start with the input the team already has.'}</h2><p>${esc(a.why)}</p><p>${esc(index?a.summary:b.description)}</p><h2>Make the review practical.</h2><ol>${a.articlePoints.map(point=>`<li>${esc(point)}</li>`).join('')}</ol><h2>One concrete example.</h2><p>${esc(a.example.before)}</p><p>${esc(a.example.after)}</p><blockquote>${esc(a.findings[0].action)}</blockquote><h2>Keep the decision with the responsible person.</h2><p>${esc(a.stages.at(-1)[1])} ${esc(a.scope)}</p><p>The product’s sample workspace lets you follow that chain: source, finding, review and retained action. The example is prepared for demonstration and does not claim measured customer performance.</p>`;
}
