const answerMap = {
  a1: ['こんそめ','コンソメ'],
  b1: ['まかろん','マカロン'],
  c1: ['きゅうり','キュウリ','胡瓜'],
  d1: ['こういか','コウイカ','甲烏賊','甲いか','甲イカ'],
  e1: ['くろまめ','クロマメ','黒豆'],
  f1: ['あずき','アズキ','小豆'],
  g1: ['あめ','アメ','飴'],
  darkFinal: ['あんこく','アンコク','暗黒'],
  a2: ['だいこん','ダイコン','大根'],
  b2: ['しいたけ','シイタケ','椎茸','しい茸'],
  c2: ['ぶたにく','ブタニク','豚肉'],
  d2: ['にんじん','ニンジン','人参'],
  e2: ['はくさい','ハクサイ','白菜'],
  f2: ['もつ','モツ'],
  g2: ['もやし','モヤシ','萌やし'],
  clearFinal: ['だんけつ','ダンケツ','団結']
};

const groups = {
  first4: ['a1','b1','c1','d1'],
  first3: ['e1','f1','g1'],
  second4: ['a2','b2','c2','d2'],
  second3: ['e2','f2','g2']
};

const state = Object.fromEntries(Object.keys(answerMap).map(k => [k,false]));

function normalize(value){
  return value.normalize('NFKC').trim().replace(/[\s・･,，。\.]/g,'').toLowerCase();
}
function isCorrect(id,value){
  const v = normalize(value);
  return answerMap[id].some(ans => normalize(ans) === v);
}
function setFeedback(id, ok){
  const fb = document.getElementById(`fb-${id}`);
  if(!fb) return;
  fb.textContent = ok ? '正解！' : 'まだ違うようです。';
  fb.className = `feedback ${ok ? 'ok':'ng'}`;
}
function groupComplete(name){return groups[name].every(id => state[id]);}
function unlock(id){document.getElementById(id)?.classList.remove('locked');}
function scrollToStage(id){setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}),250)}

function checkAnswer(id){
  const input = document.getElementById(id);
  if(!input) return;
  const ok = isCorrect(id,input.value);
  state[id] = ok;
  setFeedback(id,ok);
  if(!ok) return;

  if(groupComplete('first4')){
    unlock('stage-2');
    queueStory('afterFirst4');
  }
  if(groupComplete('first3')){
    unlock('stage-3');
    queueStory('afterFirst7');
  }
  if(id === 'darkFinal' && state.darkFinal){
    unlock('stage-4');
    queueStory('badEnd');
  }
  if(groupComplete('second4')){
    unlock('stage-5');
    queueStory('afterSecond4');
  }
  if(groupComplete('second3')){
    unlock('stage-6');
    queueStory('afterSecond7');
  }
  if(id === 'clearFinal' && state.clearFinal){
    unlock('credits');
    queueStory('clear');
    setTimeout(()=>scrollToStage('credits'),900);
  }
}

document.querySelectorAll('[data-check]').forEach(btn => btn.addEventListener('click',()=>checkAnswer(btn.dataset.check)));
document.querySelectorAll('input').forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter') checkAnswer(inp.id)}));

const storyData = {
  intro: [
    {speaker:'YOU',portrait:'Y',text:'久しぶりに、4人の予定がそろった。しかも今日は、親友の誕生日。普通に食事するだけじゃ、少しもったいない。'},
    {speaker:'FRIEND',portrait:'A',text:'「せっかくだし、何が入るか誰にも分からない闇鍋にしない？」'},
    {speaker:'FRIEND',portrait:'B',text:'「全員知らない闇鍋って、どうやって決めるんだよ。」'},
    {speaker:'SYSTEM',portrait:'?',text:'答えは、謎の中にある。4方向の問題を解き、今夜の食材を決めよう。'}
  ],
  afterFirst4:[
    {speaker:'FRIEND',portrait:'C',text:'「4つ出そろったな。……ずいぶん自由な鍋になりそうだけど。」'},
    {speaker:'YOU',portrait:'Y',text:'まだ、残りは3つ。ここからは4枚の手がかりをまとめて使う。'}
  ],
  afterFirst7:[
    {speaker:'FRIEND',portrait:'D',text:'「これで7つ。……本当にこのまま鍋にする？」'},
    {speaker:'YOU',portrait:'Y',text:'その前に、最後の謎がひとつ残っている。'}
  ],
  badEnd:[
    {speaker:'SYSTEM',portrait:'!',text:'あんこく。'},
    {speaker:'FRIEND',portrait:'A',text:'「……いや、これ今の鍋そのものじゃない？」'},
    {speaker:'YOU',portrait:'Y',text:'まだ鍋には入れていない。なら、ここで終わりじゃないはずだ。'},
    {speaker:'SYSTEM',portrait:'?',text:'ここから先の導線は仮置きです。カードの関係が変わることで、同じ問題の結果が変化していきます。'}
  ],
  afterSecond4:[
    {speaker:'FRIEND',portrait:'B',text:'「さっきと同じ問題なのに、出てくる食材が変わった……。」'},
    {speaker:'YOU',portrait:'Y',text:'残る3つも、同じように確かめよう。'}
  ],
  afterSecond7:[
    {speaker:'FRIEND',portrait:'C',text:'「今度はちゃんと鍋だ。」'},
    {speaker:'FRIEND',portrait:'D',text:'「いや、油断するな。最後の謎がまだある。」'}
  ],
  clear:[
    {speaker:'SYSTEM',portrait:'★',text:'だんけつ。'},
    {speaker:'FRIEND',portrait:'A',text:'「……なんか、今日ずっと高校の頃みたいだったな。」'},
    {speaker:'YOU',portrait:'Y',text:'大人になって、前みたいに簡単には集まれなくなった。それでも、こういう時間はまだ作れる。'},
    {speaker:'FRIEND',portrait:'B',text:'「じゃあ、鍋にしよう。今度こそ本物の。」'}
  ]
};

const modal = document.getElementById('storyModal');
const storySpeaker = document.getElementById('storySpeaker');
const storyText = document.getElementById('storyText');
const storyPortrait = document.getElementById('storyPortrait');
const storyNext = document.getElementById('storyNext');
let currentStory = null;
let currentIndex = 0;
let queuedStory = null;
let seen = new Set();

function openStory(key){
  const arr = storyData[key];
  if(!arr?.length) return;
  currentStory = key; currentIndex = 0;
  renderStory();
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
  seen.add(key);
}
function renderStory(){
  const item = storyData[currentStory][currentIndex];
  storySpeaker.textContent = item.speaker;
  storyText.textContent = item.text;
  storyPortrait.textContent = item.portrait;
  storyNext.textContent = currentIndex === storyData[currentStory].length-1 ? 'CLOSE' : 'NEXT';
}
function closeStory(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');currentStory=null;}
storyNext.addEventListener('click',()=>{
  if(currentIndex < storyData[currentStory].length-1){currentIndex++;renderStory()} else closeStory();
});
document.querySelectorAll('[data-close-story]').forEach(el=>el.addEventListener('click',closeStory));
function queueStory(key){queuedStory=key;}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const key = entry.target.dataset.story;
    if(key==='intro' && !seen.has('intro')) openStory('intro');
    if(queuedStory===key && !seen.has(key)){openStory(key); queuedStory=null;}
  })
},{threshold:.9});
document.querySelectorAll('.story-anchor').forEach(a=>observer.observe(a));

setTimeout(()=>{if(!seen.has('intro')) openStory('intro')},600);
