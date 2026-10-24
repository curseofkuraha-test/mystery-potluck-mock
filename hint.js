/* CSV構成: Level1～Level5, Content。ダブルクォート・改行を含むセルにも対応。 */
(() => {
  'use strict';
  const container = document.getElementById('accordion-container');
  function parseCsv(input) {
    const text = input.replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], field = '', quoted = false;
    for (let i=0; i<text.length; i++) {
      const c=text[i];
      if (c==='"') {
        if (quoted && text[i+1]==='"') {field+='"';i++;}
        else quoted=!quoted;
      } else if (c===',' && !quoted) {row.push(field);field='';}
      else if ((c==='\n' || c==='\r') && !quoted) {
        if(c==='\r' && text[i+1]==='\n')i++;
        row.push(field);if(row.some(v=>v.trim()))rows.push(row);
        row=[];field='';
      } else field+=c;
    }
    row.push(field);if(row.some(v=>v.trim()))rows.push(row);
    return rows;
  }
  function makeTree(rows) {
    const tree=new Map();
    for(const row of rows.slice(1)) {
      if(row.length<6)continue;
      const labels=row.slice(0,5).filter(Boolean);
      if(!labels.length)continue;
      let branch=tree;
      for(const label of labels){
        if(!branch.has(label))branch.set(label,{children:new Map(),content:null});
        branch=branch.get(label).children;
      }
      // terminal node at the end of the path
      let node=tree;
      for(let i=0;i<labels.length;i++){
        const item=node.get(labels[i]);
        if(i===labels.length-1)item.content=row.slice(5).join(',');
        node=item.children;
      }
    }
    return tree;
  }
  function appendContent(target,html) {
    const div=document.createElement('div');div.className='hint-content';
    // The CSV is project-authored content. Allow its text, line breaks and local images.
    const doc=new DOMParser().parseFromString('<div>'+html+'</div>','text/html');
    const source=doc.body.firstElementChild;
    function transfer(from,to){
      for(const child of from.childNodes){
        if(child.nodeType===Node.TEXT_NODE){to.append(document.createTextNode(child.textContent));continue;}
        if(child.nodeType!==Node.ELEMENT_NODE)continue;
        const tag=child.tagName.toLowerCase();
        if(tag==='br'){to.append(document.createElement('br'));continue;}
        if(tag==='img'){
          const path=child.getAttribute('src')||'';
          if(!/^\.\/image\/[\w.\-]+\.(png|jpe?g|webp)$/i.test(path))continue;
          const img=document.createElement('img');img.src=path;img.alt=child.getAttribute('alt')||'ヒント画像';img.loading='lazy';
          img.addEventListener('error',()=>{
            const note=document.createElement('span');note.className='hint-image-missing';note.textContent='画像素材が未配置です：'+path.split('/').pop();img.replaceWith(note);
          },{once:true});
          to.append(img);continue;
        }
        if(['b','strong','em','span','p','div','u'].includes(tag)){
          const elem=document.createElement(tag);transfer(child,elem);to.append(elem);
        } else transfer(child,to);
      }
    }
    transfer(source,div);target.append(div);
  }
  function renderTree(tree,level=0){
    const ul=document.createElement('ul');ul.className='accordion-list';
    for(const [label,node] of tree){
      const li=document.createElement('li');li.className='hint-branch';
      const details=document.createElement('details');
      const summary=document.createElement('summary');summary.textContent=label;
      details.append(summary);
      if(node.content!==null)appendContent(details,node.content);
      if(node.children.size)details.append(renderTree(node.children,level+1));
      li.append(details);ul.append(li);
    }
    return ul;
  }
  fetch('./hints.csv',{cache:'no-store'}).then(res=>{
    if(!res.ok)throw new Error('ヒントCSVを読み込めませんでした。');return res.text();
  }).then(text=>{
    const rows=parseCsv(text);container.replaceChildren(renderTree(makeTree(rows)));
  }).catch(err=>{
    container.innerHTML='';const p=document.createElement('p');p.className='hint-error';
    p.textContent=err.message+' ※Webサーバー上で開いてください。';container.append(p);
  });
})();
