export function arrowIcon(direction='up'){
 const path=direction==='right'?'M3 8h10m-4-4 4 4-4 4':direction==='left'?'M13 8H3m4-4L3 8l4 4':'M4 12 12 4M4 4h8v8';
 return `<svg class="ui-arrow" viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
}
/** Keep attributes/scripts intact while giving visible arrows a font-independent mark. */
export function iconize(html){
 return html.split(/(<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[^>]+>)/gi).map(part=>part.startsWith('<')?part:part.replace(/↗/g,arrowIcon()).replace(/→/g,arrowIcon('right')).replace(/←/g,arrowIcon('left'))).join('');
}
