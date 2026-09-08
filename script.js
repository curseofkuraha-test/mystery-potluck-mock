const answerMap = window.MYSTERY_POTLUCK_ANSWERS || {};
const storyConfig = window.MYSTERY_POTLUCK_STORY || {characters:{}, intro:[]};
const uiConfig = window.MYSTERY_POTLUCK_UI || {};

const groups = {
  first4: ['a1','b1','c1','d1'],
  first3: ['e1','f1','g1'],
  second4: ['a2','b2','c2','d2'],
  second3: ['e2','f2','g2']
};

const STORAGE_KEY = 'mysteryPotluckV7Session';
const blankState = () => Object.fromEntries(Object.keys(answerMap).map(k => [k,false]));
let state = blankState();
let fired = new Set();
let player = { name:'あなた', romaji:'YOU', initial:'Y' };
let drafts = {};
let onboardingPage = 'notice';

function loadSave(){
  try{
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    return JSON.parse(raw);
  }catch(_){ return null; }
}
function saveProgress(){
  try{
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      started: document.getElementById('gameShell') ? !document.getElementById('gameShell').hidden : false,
      player,
      state,
      fired:[...fired],
      drafts,
      onboardingPage
    }));
  }catch(_){ /* 保存不可環境ではセッション内のみ継続 */ }
}
function clearSave(){
  try{ sessionStorage.removeItem(STORAGE_KEY); }catch(_){ }
  location.reload();
}

function normalize(value){
  return String(value ?? '').normalize('NFKC').trim().replace(/[\s・･,，。\.]/g,'').toLowerCase();
}
function isCorrect(id,value){
  const allowed = answerMap[id] || [];
  const v = normalize(value);
  return allowed.some(ans => normalize(ans) === v);
}
function setFeedback(id, ok){
  const fb = document.getElementById(`fb-${id}`);
  if(!fb) return;
  fb.textContent = ok ? '正解！' : 'まだ違うようです。';
  fb.className = `feedback ${ok ? 'ok':'ng'}`;
}
function lockCorrectField(id){
  const input = document.getElementById(id);
  const btn = document.querySelector(`[data-check="${id}"]`);
  if(input){
    input.disabled = true;
    input.classList.add('is-correct');
    input.setAttribute('aria-label', `${input.getAttribute('aria-label') || input.id} 正解済み`);
  }
  if(btn){
    btn.disabled = true;
    btn.textContent = 'OK';
    btn.classList.add('is-correct');
  }
}
function groupComplete(name){ return groups[name].every(id => state[id]); }
function reveal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.remove('stage-hidden');
  el.removeAttribute('aria-hidden');
}
function scrollToStage(id){
  setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),250);
}
function completeOnce(key, fn){
  if(fired.has(key)) return;
  fired.add(key);
  saveProgress();
  fn();
}

function restoreVisibleProgress(){
  Object.entries(state).forEach(([id,ok]) => { if(ok) lockCorrectField(id); });
  if(groupComplete('first4')) reveal('stage-2');
  if(groupComplete('first3')) reveal('stage-3');
  if(state.darkFinal) reveal('stage-turn');
  if(state.turnStep) reveal('stage-4');
  if(groupComplete('second4')) reveal('stage-5');
  if(groupComplete('second3')) reveal('stage-6');
  if(state.clearFinal) reveal('credits');
}

function checkAnswer(id){
  if(state[id]) return;
  const input = document.getElementById(id);
  if(!input) return;
  const ok = isCorrect(id,input.value);
  setFeedback(id,ok);
  if(!ok) return;

  state[id] = true;
  drafts[id] = input.value;
  lockCorrectField(id);
  saveProgress();

  if(groupComplete('first4')){
    completeOnce('first4',()=>{
      reveal('stage-2');
      openStory('afterFirst4', ()=>scrollToStage('stage-2'));
    });
  }
  if(groupComplete('first3')){
    completeOnce('first3',()=>{
      reveal('stage-3');
      openStory('afterFirst7', ()=>scrollToStage('stage-3'));
    });
  }
  if(id === 'darkFinal'){
    completeOnce('darkFinal',()=>{
      reveal('stage-turn');
      openStory('badEnd', ()=>scrollToStage('stage-turn'));
    });
  }
  if(id === 'turnStep'){
    completeOnce('turnStep',()=>{
      reveal('stage-4');
      openStory('afterTurn', ()=>scrollToStage('stage-4'));
    });
  }
  if(groupComplete('second4')){
    completeOnce('second4',()=>{
      reveal('stage-5');
      openStory('afterSecond4', ()=>scrollToStage('stage-5'));
    });
  }
  if(groupComplete('second3')){
    completeOnce('second3',()=>{
      reveal('stage-6');
      openStory('afterSecond7', ()=>scrollToStage('stage-6'));
    });
  }
  if(id === 'clearFinal'){
    completeOnce('clearFinal',()=>{
      reveal('credits');
      openStory('clear', ()=>scrollToStage('credits'));
    });
  }
}

// ----- 画面コピー / 入力途中の保存 -----
function getUi(path){
  return path.split('.').reduce((obj,key)=>obj?.[key], uiConfig);
}
function hydrateUiCopy(){
  document.querySelectorAll('[data-ui]').forEach(el=>{
    const value=getUi(el.dataset.ui);
    if(typeof value==='string') el.textContent=value;
  });
}
function saveDraft(id,value){
  drafts[id]=String(value ?? '');
  saveProgress();
}
function restoreDrafts(){
  Object.entries(drafts || {}).forEach(([id,value])=>{
    const input=document.getElementById(id);
    if(input) input.value=String(value ?? '');
  });
}
function bindDraftInputs(){
  document.querySelectorAll('#gameShell input').forEach(input=>{
    input.addEventListener('input',()=>saveDraft(input.id,input.value));
  });
  const nameInput=document.getElementById('playerName');
  nameInput?.addEventListener('input',()=>{
    drafts.playerName=nameInput.value;
    onboardingPage='name';
    saveProgress();
  });
}

// ----- 名前入力 -----
function isKanaName(value){
  const v = String(value ?? '').normalize('NFKC').trim();
  if(!v || [...v].length > 6) return false;
  // ひらがな・カタカナ・長音のみ。HTML記号や英数は許可しない。
  return /^[ぁ-ゖゝゞァ-ヺヽヾー]+$/u.test(v);
}

const digraph = {
  'きゃ':'kya','きゅ':'kyu','きょ':'kyo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
  'しゃ':'sha','しゅ':'shu','しょ':'sho','じゃ':'ja','じゅ':'ju','じょ':'jo',
  'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
  'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','びゃ':'bya','びゅ':'byu','びょ':'byo',
  'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
  'りゃ':'rya','りゅ':'ryu','りょ':'ryo','ふぁ':'fa','ふぃ':'fi','ふぇ':'fe','ふぉ':'fo',
  'てぃ':'ti','でぃ':'di','うぃ':'wi','うぇ':'we','うぉ':'wo','ゔぁ':'va','ゔぃ':'vi','ゔぇ':'ve','ゔぉ':'vo'
};
const mono = {
  'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go','さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
  'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do','な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
  'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po','ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
  'や':'ya','ゆ':'yu','よ':'yo','ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'o',
  'ん':'n','ゔ':'vu','ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o','ゃ':'ya','ゅ':'yu','ょ':'yo'
};
function kataToHira(str){
  return [...str].map(ch=>{
    const c=ch.charCodeAt(0);
    return (c>=0x30A1 && c<=0x30F6) ? String.fromCharCode(c-0x60) : ch;
  }).join('');
}
function kanaToRomaji(value){
  const src = kataToHira(String(value).normalize('NFKC'));
  let out='';
  let geminate=false;
  for(let i=0;i<src.length;i++){
    const ch=src[i];
    if(ch==='っ'){ geminate=true; continue; }
    if(ch==='ー'){
      const m=out.match(/[aeiou](?!.*[aeiou])/);
      if(m) out += m[0];
      continue;
    }
    const pair=src.slice(i,i+2);
    let roma=digraph[pair];
    if(roma) i++;
    else roma=mono[ch] || '';
    if(geminate && roma){
      const head = roma.startsWith('ch') ? 't' : roma.startsWith('sh') ? 's' : roma[0];
      out += head;
      geminate=false;
    }
    out += roma;
  }
  return out.toUpperCase() || 'YOU';
}
function setPlayerName(raw){
  const name = String(raw).normalize('NFKC').trim();
  const romaji = kanaToRomaji(name);
  player = {name, romaji, initial:(romaji[0] || 'Y').toUpperCase()};
}
function updateNamePreview(){
  const input=document.getElementById('playerName');
  const v=input.value.normalize('NFKC').trim();
  const preview=document.getElementById('namePreview');
  const err=document.getElementById('nameError');
  if(!v){ preview.classList.remove('show'); err.textContent=''; return; }
  if(!isKanaName(v)){
    preview.classList.remove('show');
    err.textContent = [...v].length > 6 ? '6文字以内で入力してください。' : '仮名で入力してください。';
    return;
  }
  err.textContent='';
  const r=kanaToRomaji(v);
  document.getElementById('namePreviewText').textContent=v;
  document.getElementById('namePreviewRoman').textContent=r;
  document.querySelector('#namePreviewAvatar .mini-initial').textContent=(r[0]||'Y').toUpperCase();
  preview.classList.add('show');
}

function showOnboardingPage(name){
  onboardingPage=name;
  document.body.classList.toggle('is-name-entry', name==='name');
  if(name==='name') window.scrollTo(0,0);
  document.querySelectorAll('.onboarding-page').forEach(page=>{
    const on=page.dataset.onboardingPage===name;
    page.classList.toggle('is-active',on);
    page.setAttribute('aria-hidden', String(!on));
  });
  saveProgress();
}
function beginGame(isNew){
  document.body.classList.remove('is-name-entry');
  document.getElementById('onboarding').classList.add('is-hidden');
  const shell=document.getElementById('gameShell');
  shell.hidden=false;
  restoreVisibleProgress();
  restoreDrafts();
  if(isNew){
    fired.add('intro');
    saveProgress();
    setTimeout(()=>openStory('intro'),420);
  }
}

document.getElementById('toNameStep').addEventListener('click',()=>showOnboardingPage('name'));
document.getElementById('backToNotice').addEventListener('click',()=>showOnboardingPage('notice'));
document.getElementById('resetProgress').addEventListener('click',clearSave);
document.getElementById('playerName').addEventListener('input',updateNamePreview);
document.getElementById('playerName').addEventListener('keydown',e=>{ if(e.key==='Enter') document.getElementById('startGame').click(); });
document.getElementById('startGame').addEventListener('click',()=>{
  const raw=document.getElementById('playerName').value;
  const err=document.getElementById('nameError');
  if(!isKanaName(raw)){
    const len=[...String(raw).normalize('NFKC').trim()].length;
    err.textContent = len>6 ? '6文字以内で入力してください。' : '仮名で入力してください。';
    return;
  }
  setPlayerName(raw);
  state=blankState();
  fired=new Set();
  drafts={playerName: player.name};
  saveProgress();
  beginGame(true);
});

// ----- 解答判定 -----
document.querySelectorAll('[data-check]').forEach(btn=>btn.addEventListener('click',()=>checkAnswer(btn.dataset.check)));
document.querySelectorAll('#gameShell input').forEach(inp=>inp.addEventListener('keydown',e=>{
  if(e.key==='Enter' && !inp.disabled) checkAnswer(inp.id);
}));

// ----- ストーリー -----
const modal=document.getElementById('storyModal');
const storySpeaker=document.getElementById('storySpeaker');
const storyText=document.getElementById('storyText');
const storyPortrait=document.getElementById('storyPortrait');
const portraitInitial=document.getElementById('portraitInitial');
const storyNext=document.getElementById('storyNext');
let currentStory=null;
let currentIndex=0;
let afterStory=null;

function template(text){
  return String(text ?? '')
    .replaceAll('{{player}}', player.name)
    .replaceAll('{{playerInitial}}', player.initial);
}
function characterFor(key){
  return storyConfig.characters?.[key] || storyConfig.characters?.narrator || {display:'',initial:'',tone:'narrator',human:false,narrator:true};
}
function openStory(key,onClose=null){
  const arr=storyConfig[key];
  if(!arr?.length){ if(onClose) onClose(); return; }
  currentStory=key;
  currentIndex=0;
  afterStory=onClose;
  renderStory();
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function renderStory(){
  const item=storyConfig[currentStory][currentIndex];
  const ch=characterFor(item.speakerKey);
  storySpeaker.textContent=template(ch.display);
  storyText.textContent=template(item.text); // HTMLとして解釈しない
  portraitInitial.textContent=template(ch.initial);
  storyPortrait.dataset.tone=ch.tone || 'narrator';
  storyPortrait.dataset.human=String(Boolean(ch.human));
  const sheet=document.querySelector('.story-sheet');
  sheet?.classList.toggle('is-narration', Boolean(ch.narrator));
  if(sheet) sheet.dataset.speakerTone=ch.tone || 'narrator';
  storyNext.textContent=currentIndex===storyConfig[currentStory].length-1?'CLOSE':'NEXT';
}
function closeStory(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  currentStory=null;
  const cb=afterStory;
  afterStory=null;
  if(cb) cb();
}
storyNext.addEventListener('click',()=>{
  if(currentIndex<storyConfig[currentStory].length-1){ currentIndex++; renderStory(); }
  else closeStory();
});
document.querySelectorAll('[data-close-story]').forEach(el=>el.addEventListener('click',closeStory));

// ----- 起動 -----
hydrateUiCopy();
const saved=loadSave();
if(saved){
  if(saved.player?.name && isKanaName(saved.player.name)) player=saved.player;
  state={...blankState(), ...(saved.state||{})};
  fired=new Set(saved.fired||[]);
  drafts={...(saved.drafts||{})};
  onboardingPage=saved.onboardingPage || 'notice';
}
bindDraftInputs();
if(saved?.started && player?.name && isKanaName(player.name)){
  beginGame(false);
}else{
  document.getElementById('gameShell').hidden=true;
  const nameDraft=drafts.playerName || '';
  if(nameDraft){
    document.getElementById('playerName').value=nameDraft;
    updateNamePreview();
  }
  showOnboardingPage(onboardingPage === 'name' ? 'name' : 'notice');
}
