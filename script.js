const answerMap = window.MYSTERY_POTLUCK_ANSWERS || {};
const storyConfig = window.MYSTERY_POTLUCK_STORY || {characters:{}, intro:[]};
const uiConfig = window.MYSTERY_POTLUCK_UI || {};
const characters = window.MYSTERY_POTLUCK_CHARACTERS || [];

const groups = {
  first4: ['a1','b1','c1','d1'],
  first3: ['e1','f1','g1'],
  second4: ['a2','b2','c2','d2'],
  second3: ['e2','f2','g2']
};

const STORAGE_KEY = 'mysteryPotluckV10Session';
const blankState = () => Object.fromEntries(Object.keys(answerMap).map(k => [k,false]));
let state = blankState();
let fired = new Set();
let drafts = {};
let onboardingPage = 'notice';
let participantCount = 0;
let participants = [];
let bgmEnabled = true;

function loadSave(){
  try{
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(_){ return null; }
}
function saveProgress(){
  try{
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      started: !document.getElementById('gameShell')?.hidden,
      state, fired:[...fired], drafts, onboardingPage,
      participantCount, participants, bgmEnabled
    }));
  }catch(_){ }
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
  if(input){ input.disabled = true; input.classList.add('is-correct'); }
  if(btn){ btn.disabled = true; btn.textContent = 'OK'; btn.classList.add('is-correct'); }
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
  fired.add(key); saveProgress(); fn();
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

  if(groupComplete('first4')) completeOnce('first4',()=>{ reveal('stage-2'); openStory('afterFirst4',()=>scrollToStage('stage-2')); });
  if(groupComplete('first3')) completeOnce('first3',()=>{ reveal('stage-3'); openStory('afterFirst7',()=>scrollToStage('stage-3')); });
  if(id === 'darkFinal') completeOnce('darkFinal',()=>{ reveal('stage-turn'); openStory('badEnd',()=>scrollToStage('stage-turn')); });
  if(id === 'turnStep') completeOnce('turnStep',()=>{ reveal('stage-4'); openStory('afterTurn',()=>scrollToStage('stage-4')); });
  if(groupComplete('second4')) completeOnce('second4',()=>{ reveal('stage-5'); openStory('afterSecond4',()=>scrollToStage('stage-5')); });
  if(groupComplete('second3')) completeOnce('second3',()=>{ reveal('stage-6'); openStory('afterSecond7',()=>scrollToStage('stage-6')); });
  if(id === 'clearFinal') completeOnce('clearFinal',()=>{ reveal('credits'); openStory('clear',()=>scrollToStage('credits')); });
}

function getUi(path){ return path.split('.').reduce((obj,key)=>obj?.[key], uiConfig); }
function hydrateUiCopy(){
  document.querySelectorAll('[data-ui]').forEach(el=>{
    const value = getUi(el.dataset.ui);
    if(typeof value === 'string') el.textContent = value;
  });
}
function saveDraft(id,value){ drafts[id] = String(value ?? ''); saveProgress(); }
function restoreDrafts(){
  Object.entries(drafts).forEach(([id,value])=>{
    const input = document.getElementById(id);
    if(input) input.value = String(value ?? '');
  });
}
function bindDraftInputs(){
  document.querySelectorAll('#gameShell input').forEach(input=>{
    input.addEventListener('input',()=>saveDraft(input.id,input.value));
  });
}

function isKanaOptional(value){
  const v = String(value ?? '').normalize('NFKC').trim();
  if(!v) return true;
  if([...v].length > 6) return false;
  return /^[ぁ-ゖゝゞァ-ヺヽヾー]+$/u.test(v);
}

function showOnboardingPage(name){
  onboardingPage = name;
  document.body.classList.toggle('is-setup-entry', name === 'players' || name === 'characters');
  window.scrollTo(0,0);
  document.querySelectorAll('.onboarding-page').forEach(page=>{
    const on = page.dataset.onboardingPage === name;
    page.classList.toggle('is-active',on);
    page.setAttribute('aria-hidden',String(!on));
  });
  saveProgress();
}

function renderPlayerCountButtons(){
  const wrap = document.getElementById('playerCountButtons');
  wrap.innerHTML = '';
  for(let n=1;n<=4;n++){
    const b = document.createElement('button');
    b.type='button'; b.className='count-button'; b.textContent=`${n}人`;
    b.classList.toggle('is-selected', participantCount===n);
    b.addEventListener('click',()=>{
      participantCount=n;
      participants = Array.from({length:n},(_,i)=>participants[i] || {name:'',characterId:''});
      renderPlayerCountButtons();
      document.getElementById('toCharactersStep').disabled=false;
      saveProgress();
    });
    wrap.appendChild(b);
  }
  document.getElementById('toCharactersStep').disabled = !participantCount;
}

function selectedCharacterIds(exceptIndex=-1){
  return participants.map((p,i)=>i===exceptIndex?'':p.characterId).filter(Boolean);
}
function renderCharacterSlots(){
  const wrap=document.getElementById('playerSlots');
  wrap.innerHTML='';
  participants.forEach((participant,index)=>{
    const slot=document.createElement('section'); slot.className='player-slot';
    const head=document.createElement('div'); head.className='slot-head';
    head.innerHTML=`<span>PLAYER ${index+1}</span><strong>${participant.characterId ? (characters.find(c=>c.id===participant.characterId)?.name || '') : 'キャラクター未選択'}</strong>`;
    slot.appendChild(head);

    const nameLabel=document.createElement('label'); nameLabel.className='slot-name-label'; nameLabel.textContent='プレイヤー名（任意・仮名6文字以内）';
    const input=document.createElement('input'); input.type='text'; input.maxLength=6; input.autocomplete='off'; input.value=participant.name||''; input.placeholder='例：ユウ';
    const nameErr=document.createElement('p'); nameErr.className='slot-name-error';
    input.addEventListener('input',()=>{
      participants[index].name=input.value.normalize('NFKC').trim();
      nameErr.textContent=isKanaOptional(input.value)?'':'仮名6文字以内で入力してください。';
      saveProgress();
    });
    slot.append(nameLabel,input,nameErr);

    const grid=document.createElement('div'); grid.className='character-grid';
    characters.forEach(ch=>{
      const btn=document.createElement('button'); btn.type='button'; btn.className='character-card';
      const used=selectedCharacterIds(index).includes(ch.id);
      const chosen=participant.characterId===ch.id;
      btn.disabled=used; btn.classList.toggle('is-selected',chosen);
      btn.innerHTML=`<span class="character-avatar" data-char="${ch.id}"><b>${ch.initial}</b><i></i></span><span class="character-copy"><strong>${ch.name}</strong><em>${ch.tagline}</em><small>${ch.detail}</small></span>`;
      btn.addEventListener('click',()=>{
        participants[index].characterId=ch.id;
        renderCharacterSlots(); saveProgress();
      });
      grid.appendChild(btn);
    });
    slot.appendChild(grid); wrap.appendChild(slot);
  });
}
function validateSetup(){
  const error=document.getElementById('setupError');
  if(!participantCount || participants.length!==participantCount){ error.textContent='参加人数を選んでください。'; return false; }
  if(participants.some(p=>!p.characterId)){ error.textContent='全員の担当キャラクターを選んでください。'; return false; }
  if(participants.some(p=>!isKanaOptional(p.name))){ error.textContent='プレイヤー名は仮名6文字以内で入力してください。'; return false; }
  error.textContent=''; return true;
}

const bgmAudio=document.getElementById('bgmAudio');
const bgmToggle=document.getElementById('bgmToggle');
const bgmLabel=document.getElementById('bgmLabel');
function updateBgmUi(){
  const playing = bgmEnabled && !bgmAudio.paused;
  bgmToggle?.setAttribute('aria-pressed',String(playing));
  if(bgmLabel) bgmLabel.textContent = bgmEnabled ? 'BGM ON' : 'BGM OFF';
  bgmToggle?.classList.toggle('is-off',!bgmEnabled);
}
async function tryPlayBgm(){
  if(!bgmEnabled) return;
  bgmAudio.volume=.28;
  try{ await bgmAudio.play(); }catch(_){ }
  updateBgmUi();
}
function stopBgm(){ bgmAudio.pause(); updateBgmUi(); }
bgmToggle?.addEventListener('click',()=>{
  bgmEnabled=!bgmEnabled;
  if(bgmEnabled) tryPlayBgm(); else stopBgm();
  saveProgress();
});

function beginGame(isNew){
  document.body.classList.remove('is-setup-entry');
  document.getElementById('onboarding').classList.add('is-hidden');
  const shell=document.getElementById('gameShell'); shell.hidden=false;
  restoreVisibleProgress(); restoreDrafts();
  tryPlayBgm();
  if(isNew){
    fired.add('intro'); saveProgress();
    setTimeout(()=>openStory('intro'),420);
  }
}

document.getElementById('toPlayersStep').addEventListener('click',()=>showOnboardingPage('players'));
document.getElementById('backToNotice').addEventListener('click',()=>showOnboardingPage('notice'));
document.getElementById('toCharactersStep').addEventListener('click',()=>{ renderCharacterSlots(); showOnboardingPage('characters'); });
document.getElementById('backToPlayers').addEventListener('click',()=>showOnboardingPage('players'));
document.getElementById('resetProgress').addEventListener('click',clearSave);
document.getElementById('startGame').addEventListener('click',()=>{
  if(!validateSetup()) return;
  state=blankState(); fired=new Set(); drafts={}; saveProgress(); beginGame(true);
});

document.querySelectorAll('[data-check]').forEach(btn=>btn.addEventListener('click',()=>checkAnswer(btn.dataset.check)));
document.querySelectorAll('#gameShell input').forEach(inp=>inp.addEventListener('keydown',e=>{ if(e.key==='Enter' && !inp.disabled) checkAnswer(inp.id); }));

const modal=document.getElementById('storyModal');
const storySpeaker=document.getElementById('storySpeaker');
const storyText=document.getElementById('storyText');
const storyPortrait=document.getElementById('storyPortrait');
const portraitInitial=document.getElementById('portraitInitial');
const storyNext=document.getElementById('storyNext');
let currentStory=null, currentIndex=0, afterStory=null;
function characterFor(key){ return storyConfig.characters?.[key] || storyConfig.characters?.narrator || {display:'',initial:'',tone:'narrator',human:false,narrator:true}; }
function openStory(key,onClose=null){
  const arr=storyConfig[key]; if(!arr?.length){ onClose?.(); return; }
  currentStory=key; currentIndex=0; afterStory=onClose; renderStory();
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
}
function renderStory(){
  const item=storyConfig[currentStory][currentIndex]; const ch=characterFor(item.speakerKey);
  storySpeaker.textContent=ch.display || '';
  storyText.textContent=String(item.text ?? '');
  portraitInitial.textContent=ch.initial || '';
  storyPortrait.dataset.tone=ch.tone || 'narrator'; storyPortrait.dataset.human=String(Boolean(ch.human));
  const sheet=document.querySelector('.story-sheet');
  sheet?.classList.toggle('is-narration',Boolean(ch.narrator));
  if(sheet) sheet.dataset.speakerTone=ch.tone || 'narrator';
  storyNext.textContent=currentIndex===storyConfig[currentStory].length-1?'CLOSE':'NEXT';
}
function closeStory(){
  modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); currentStory=null;
  const cb=afterStory; afterStory=null; cb?.();
}
storyNext.addEventListener('click',()=>{ if(currentIndex<storyConfig[currentStory].length-1){ currentIndex++; renderStory(); } else closeStory(); });
document.querySelectorAll('[data-close-story]').forEach(el=>el.addEventListener('click',closeStory));

hydrateUiCopy();
const saved=loadSave();
if(saved){
  state={...blankState(),...(saved.state||{})}; fired=new Set(saved.fired||[]); drafts={...(saved.drafts||{})};
  onboardingPage=saved.onboardingPage||'notice'; participantCount=Number(saved.participantCount)||0;
  participants=Array.isArray(saved.participants)?saved.participants:[];
  bgmEnabled=saved.bgmEnabled!==false;
}
bindDraftInputs(); renderPlayerCountButtons(); updateBgmUi();
if(saved?.started && participantCount && participants.length===participantCount){
  beginGame(false);
  const unlock=()=>{ tryPlayBgm(); window.removeEventListener('pointerdown',unlock); window.removeEventListener('keydown',unlock); };
  window.addEventListener('pointerdown',unlock,{once:true}); window.addEventListener('keydown',unlock,{once:true});
}else{
  document.getElementById('gameShell').hidden=true;
  showOnboardingPage(['players','characters'].includes(onboardingPage)?onboardingPage:'notice');
  if(onboardingPage==='characters' && participantCount) renderCharacterSlots();
}
