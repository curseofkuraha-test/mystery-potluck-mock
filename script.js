const answerMap = {
  a1: ['こんそめ','コンソメ'],
  b1: ['まかろん','マカロン'],
  c1: ['きゅうり','キュウリ','胡瓜'],
  d1: ['こういか','コウイカ','甲烏賊','甲いか','甲イカ'],
  e1: ['くろまめ','クロマメ','黒豆'],
  f1: ['あずき','アズキ','小豆'],
  g1: ['あめ','アメ','飴'],
  darkFinal: ['あんこく','アンコク','暗黒'],
  turnStep: ['まわす','マワス','回す'],
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
const fired = new Set();

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
  fn();
}

function checkAnswer(id){
  if(state[id]) return;
  const input = document.getElementById(id);
  if(!input) return;
  const ok = isCorrect(id,input.value);
  setFeedback(id,ok);
  if(!ok) return;

  state[id] = true;
  lockCorrectField(id);

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

document.querySelectorAll('[data-check]').forEach(btn => btn.addEventListener('click',()=>checkAnswer(btn.dataset.check)));
document.querySelectorAll('input').forEach(inp => inp.addEventListener('keydown',e=>{
  if(e.key==='Enter' && !inp.disabled) checkAnswer(inp.id);
}));

const storyData = {
  intro: [
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'今日は、あなたの誕生日。高校時代からの友人たちと、久しぶりに4人で予定を合わせることができた。'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「せっかく4人揃ったんだし、普通にご飯食べて終わるの、もったいなくない？」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「その言い方をすると、だいたい面倒なことが始まるんだよな。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「じゃあ闇鍋にしよう。しかも、4人とも何が入るか知らないやつ。」'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「いいじゃん。何を入れるかは――謎を解いて決めよう。」'},
    {speaker:'SYSTEM',portrait:'?',tone:'system',text:'中央に“鍋”を置き、4方向の謎に挑戦してください。どの方向から始めても構いません。相談も自由です。'}
  ],
  afterFirst4:[
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「4つ揃ったな。順番バラバラで解いてるのに、ちゃんと一つの鍋に集まっていくの、ちょっと面白いな。」'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「まだ3つある。ここからは4人分の手がかりをまとめて使うんだって。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「じゃあ、今度は全員参加だ。」'}
  ],
  afterFirst7:[
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「これで7つ！ ……いや、すごいラインナップだな。」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「闇鍋としては満点かもしれないけど、まだ鍋には入れるなよ。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「最後の謎が残ってる。7つの食材を使うみたい。」'}
  ],
  badEnd:[
    {speaker:'SYSTEM',portrait:'!',tone:'system',text:'あんこく'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「……暗黒。まあ、この7つを見たら言いたくなる気持ちは分かる。」'},
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'「待って。……きゅうりが入ってる。」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「あ。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「高校のとき、罰ゲームで無理して食べてから駄目になったやつ……。」'},
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'匂いだけでも、あのときの気分の悪さを思い出してしまう。食べられないことは、3人も知っている。'},
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'「ごめん。闇鍋なんだから仕方ないし、俺だけ別のもの食べれば――」'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「それじゃ、今日4人で集まった意味ないでしょ。」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「まだ鍋には入れてない。だったら、できることはあるかもしれない。」'},
    {speaker:'SYSTEM',portrait:'?',tone:'system',text:'この夜を4人で囲むために、もう一つだけ謎を解いてください。'}
  ],
  afterTurn:[
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「……カードを、取り皿の上で回す？」'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「やってみよう。」'},
    {speaker:'SYSTEM',portrait:'↻',tone:'system',text:'図のとおりにカードを回してください。回したカードに現れた“動き”を、そのまま実物で確かめてください。'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「これ……カードを隣へ渡せってことか。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「全部同じだ。4枚とも、一つ隣へ。」'},
    {speaker:'SYSTEM',portrait:'→',tone:'system',text:'カードを移動したら、これまでカードを使った問題をもう一度見直してください。'}
  ],
  afterSecond4:[
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「変わった……！ 同じ問題なのに、出てきた食材が全部違う。」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「待って。このカード、4人で解いた3問にも使ったよな。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「そっちも今の配置で解いたら、変わるかも。」'}
  ],
  afterSecond7:[
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「大根、しいたけ、豚肉、人参、白菜、もつ、もやし。」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「今度は、ちゃんと4人で食べられる鍋だ。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「でも最後の謎は同じだよ。」'},
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'同じ問題。違うのは、ここまで4人で集めてきたものだけ。'}
  ],
  clear:[
    {speaker:'SYSTEM',portrait:'★',tone:'system',text:'だんけつ'},
    {speaker:'ナツ',portrait:'N',tone:'natsu',text:'「よし。今度こそ鍋にしよう！」'},
    {speaker:'ミナト',portrait:'M',tone:'minato',text:'「肉はちゃんと火が通ってから食えよ。闇鍋でもそこは守れ。」'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「ポン酢、そっちにある？」'},
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'誰かが具材を入れて、誰かが取り分ける。くだらない話をして、笑って、鍋の湯気が四人の間に上がる。'},
    {speaker:'ハル',portrait:'H',tone:'haru',text:'「なんか今日、久しぶりに高校の頃みたいだったな。」'},
    {speaker:'あなた',portrait:'YOU',tone:'you',text:'大人になって、前みたいに簡単には集まれない。それでも、こういう時間はまだ作れる。'}
  ]
};

const modal = document.getElementById('storyModal');
const storySpeaker = document.getElementById('storySpeaker');
const storyText = document.getElementById('storyText');
const storyPortrait = document.getElementById('storyPortrait');
const storyNext = document.getElementById('storyNext');
let currentStory = null;
let currentIndex = 0;
let afterStory = null;

function openStory(key, onClose=null){
  const arr = storyData[key];
  if(!arr?.length) { if(onClose) onClose(); return; }
  currentStory = key;
  currentIndex = 0;
  afterStory = onClose;
  renderStory();
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function renderStory(){
  const item = storyData[currentStory][currentIndex];
  storySpeaker.textContent = item.speaker;
  storyText.textContent = item.text;
  storyPortrait.textContent = item.portrait;
  storyPortrait.dataset.tone = item.tone || 'system';
  storyNext.textContent = currentIndex === storyData[currentStory].length-1 ? 'CLOSE' : 'NEXT';
}
function closeStory(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  currentStory = null;
  const cb = afterStory;
  afterStory = null;
  if(cb) cb();
}
storyNext.addEventListener('click',()=>{
  if(currentIndex < storyData[currentStory].length-1){
    currentIndex++;
    renderStory();
  } else closeStory();
});
document.querySelectorAll('[data-close-story]').forEach(el=>el.addEventListener('click',closeStory));

setTimeout(()=>openStory('intro'),550);
