(() => {
  'use strict';
  const DATA = window.POTLUCK_DATA;
  const KEY = 'mystery-potluck-web-v4'; // 前版の進行状況を引き継ぐ
  const STAGES = ['notice', 'prep', 'm1', 'm2', 'm3', 'call', 'search', 'last', 'ending'];
  const root = document.getElementById('game');
  const overlay = document.getElementById('result-overlay');
  const modalBody = document.getElementById('result-body');
  const closeModalButton = document.getElementById('close-result');
  let previousFocus = null;
  let composing = false;
  let interimHelpPending = false;

  const blank = () => ({
    unlocked: ['notice'], prepDone: false,
    months: {1:{phase:'sealed',solved:[],potSolved:false},2:{phase:'sealed',solved:[],potSolved:false},3:{phase:'sealed',solved:[],potSolved:false}},
    last: {phase:'sealed',firstSolved:false,finalSolved:false}
  });
  function load() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      if (!value || !Array.isArray(value.unlocked) || !value.months || !value.last) return blank();
      const base = blank();
      base.unlocked = STAGES.filter(x => value.unlocked.includes(x));
      base.prepDone = !!value.prepDone;
      for (const m of DATA.months) {
        const old = value.months[m.id] || {};
        base.months[m.id] = {
          phase:['sealed','opened','confirmed'].includes(old.phase)?old.phase:'sealed',
          solved:Array.isArray(old.solved)?[...new Set(old.solved.filter(i=>Number.isInteger(i)&&i>=0&&i<m.foods.length))]:[],
          potSolved:!!old.potSolved
        };
      }
      base.last = {phase:['sealed','opened','confirmed'].includes(value.last.phase)?value.last.phase:'sealed',firstSolved:!!value.last.firstSolved,finalSolved:!!value.last.finalSolved};
      return base;
    } catch { return blank(); }
  }
  let state = load();
  // 旧版では鍋の完成後にもう一度「1ヶ月目へ進む」を押す仕様だった。
  // 既存のセーブデータでも、鍋を準備済みなら1ヶ月目を表示する。
  if (state.prepDone && !state.unlocked.includes('m1') && state.unlocked.includes('prep')) {
    state.unlocked.push('m1');
    state.unlocked = STAGES.filter(x => state.unlocked.includes(x));
  }
  const save = () => {try {localStorage.setItem(KEY,JSON.stringify(state));} catch { /* ストレージ無効でもプレイ可能 */ }};
  const esc = value => String(value??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = value => String(value||'').normalize('NFKC').trim().toLowerCase()
    .replace(/[\s\u3000・･、,。．.\-―－]/g,'')
    .replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60))
    .replace(/鍋/g,'なべ');
  const matches = (value,variants) => variants.some(v=>norm(value)===norm(v));
  const img = file => `<img class="step-heading" src="./assets/${file}" alt="${file==='laststep.png'?'LAST STEP 4ヶ月目':file==='step0.png'?'STEP.0':file.replace('.png','').toUpperCase()}" width="447" height="320">`;
  const action = (label,key,kind='') => `<div class="actions"><button type="button" class="action ${kind}" data-action="${key}">${esc(label)}</button></div>`;
  const done = label => `<div class="actions"><button type="button" class="action" disabled>${esc(label)}</button></div>`;
  const panel = (id,content) => `<section class="panel" id="section-${id}">${content}</section>`;
  const exists = stage => state.unlocked.includes(stage);
  const month = n => DATA.months[n-1];
  const monthState = n => state.months[n];
  const story = text => `<p class="story">${esc(text)}</p>`;
  const directive = text => `<p class="directive">${esc(text)}</p>`;
  const mission = text => `<div class="mission"><span class="mission-text">${esc(text)}</span></div>`;
  const bubble = text => `<div class="dialogue"><span class="speaker">あなた</span><div class="bubble">${esc(text)}</div></div>`;

  function showModal({comment,missionText='',heading='正解！',kind='success',missionLabel='新たなミッション'}) {
    previousFocus = document.activeElement;
    modalBody.innerHTML = `<h2 class="result-title ${kind==='interim'?'interim':''}">${esc(heading)}</h2>
      ${comment?`<div class="result-speaker">あなた</div><div class="result-bubble">${esc(comment)}</div>`:''}
      ${missionText?`<div class="result-mission"><span class="result-mission-label">${esc(missionLabel)}</span><strong>${esc(missionText)}</strong></div>`:''}`;
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    closeModalButton.focus({preventScroll:true});
  }
  function closeModal() {
    if (overlay.hidden || interimHelpPending) return;
    overlay.hidden = true;
    document.body.classList.remove('modal-open');
    modalBody.innerHTML = '';
    if (previousFocus?.isConnected && !previousFocus.disabled) previousFocus.focus({preventScroll:true});
    previousFocus = null;
  }
  function showInterimHelp() {
    interimHelpPending = false;
    modalBody.innerHTML = `<div class="system-help" role="note"><span class="system-help-label">ゲーム進行のヒント</span><p>本当に出汁を２度取りましたか？</p></div>`;
    closeModalButton.hidden = false;
    closeModalButton.focus({preventScroll:true});
  }
  modalBody.addEventListener('click',event=>{
    if (event.target.closest('[data-modal-next]')) showInterimHelp();
  });
  closeModalButton.addEventListener('click',closeModal);
  overlay.addEventListener('click',event=>{if(event.target===overlay)closeModal();});
  document.addEventListener('keydown',event=>{
    if(overlay.hidden)return;
    if(event.key==='Escape'){event.preventDefault();if(!interimHelpPending)closeModal();}
    if(event.key==='Tab') {event.preventDefault();(interimHelpPending?modalBody.querySelector('[data-modal-next]'):closeModalButton).focus({preventScroll:true});}
  });

  function unlock(stage) {
    if (!STAGES.includes(stage) || exists(stage)) return;
    const previous = STAGES[STAGES.indexOf(stage)-1];
    if (!exists(previous)) return;
    state.unlocked.push(stage);save();
    root.insertAdjacentHTML('beforeend',buildStage(stage));
    // スクロール移動はしない。押したボタンは同じ文言で無効化。
    const btn = root.querySelector(`[data-action="unlock:${stage}"]`);
    if (btn) {btn.disabled=true;}
  }
  function next(stage,label) {
    return `<div class="reveal next-step">${exists(stage)?done(label):action(label,`unlock:${stage}`)}</div>`;
  }
  function renderNotice() {
    return panel('notice',`<h1>「ミステリーポットラック」を<br>始める前に</h1>
      <p class="notice-intro">ゲームを始める前に、以下の内容物が揃っているか確認してください。</p>
      <h2 class="inventory-heading">内容物</h2>
      <ul class="inventory">${DATA.inventory.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      <h2 class="notice-heading">注意事項</h2>
      <div class="notice-text"><p>・指示があるまで、封筒を開けたり中身を取り出したりしないでください。</p>
      <p>・ゲームは、このWebサイトの案内に沿って進行します。謎の答えがわかったら解答欄に入力してください。</p>
      <p>・進行状況は、このブラウザに保存されます。ブラウザのデータを削除すると、続きから再開できなくなる場合があります。</p>
      <p>・十分にコンテンツを楽しんでいただくため、ソースコードの閲覧はお控えください。</p>
      <p>・内容物の不足や不備がある場合は、下記窓口までご連絡ください。</p></div>
      <div class="contact">株式会社エフェックス<br><a href="mailto:${esc(DATA.contact)}">${esc(DATA.contact)}</a></div>
      ${exists('prep')?done('確認しました・ゲームを始める'):action('確認しました・ゲームを始める','unlock:prep')}`);
  }
  function renderPrep() {
    return panel('prep',`<div class="narrative-block narrative-opening"><h2>STORY</h2>
      ${story('あなたには、子どもの頃からの夢がある。旅客機のパイロットになることだ。')}
      ${story('大学時代にはその夢を目指して勉強していた。しかし、厳しい選抜や人の命を預かる責任の大きさを知るにつれ、自分に務まる自信がなくなってしまった。')}
      ${story('結局、応募することなく卒業し、現在の仕事に就いた。仕事にはやりがいを感じている。それでも、パイロットへの憧れは消えていない。')}
      ${story('そんなあなたのもとに、ミステリーポットラックの最初の食材が届く。')}</div>
      ${img('step0.png')}
      ${directive('まずは鍋を準備しましょう。')}
      <p class="subcopy">「STEP.0」の用紙と折り紙シートを取り出し、<br>書かれた指示に沿って鍋を作ってください。</p>
      <p class="subcopy">完成したら、鍋敷きシートの上に置けば準備完了です。<br>この鍋は、ゲームの途中でも使用します。</p>
      <p class="prep-warning"><strong>※ゲーム中に破れてしまったり、作る過程で破れた際は、同封されている予備をお使いください。</strong></p>
      ${state.prepDone?done('鍋を準備しました'):action('鍋を準備しました','prep-done')}`);
  }
  function renderMonth(n) {
    const m=month(n),s=monthState(n);
    return panel(`m${n}`,`${img(m.image)}${directive(`「${m.label}」の封筒を開けてください。`)}
      ${s.phase==='sealed'?action('開けました',`opened:${n}`):done('開けました')}
      ${s.phase!=='sealed'?renderConfirm(n):''}`);
  }
  function renderConfirm(n) {
    const m=month(n),s=monthState(n);
    return `<div class="reveal confirm-phase" data-phase="confirm-${n}">
      <div class="confirm-card">
        <h3 class="confirm-heading">内容物を確認してください。</h3>
        <p><strong>まずは、封筒の中から一番大きい紙を取り出し、机の上に置いてください。</strong></p>
        <p><strong>その後、封筒を鍋の上でひっくり返し、中身を入れてください。</strong></p>
      </div>
      ${s.phase==='opened'?action('内容物を確認しました',`confirmed:${n}`):done('内容物を確認しました')}
      ${s.phase==='confirmed'?renderPlay(n):''}</div>`;
  }
  function renderFoodLog(n,index,position) {
    const food=month(n).foods[index];
    return `<li><span class="log-index">${String(position+1).padStart(2,'0')}</span>
      <strong>${esc(food.name)}</strong>
      <button type="button" class="comment-replay" data-action="replay:${n}:${index}">感想を見る</button></li>`;
  }
  function renderPlay(n) {
    const m=month(n),s=monthState(n);
    return `<div class="reveal play" data-phase="play-${n}">
      ${story(m.intro)}
      <div class="instruction"><p>鍋の中から好きなものを取り出して、好きな順に解き明かしましょう。</p>
      <p class="instruction-warning">※一度取り出したものは、鍋の中に戻してはいけません。</p>
      <p>わかった食材名を、下の解答欄に入力してください。</p></div>
      <div class="answer-area"><h3>食材の答え</h3>
      <p class="progress-count" data-progress="${n}">${s.solved.length} / ${m.count} 種類が判明しました。</p>
      <form class="answer-form" data-form="food:${n}" autocomplete="off">
      <input name="answer" aria-label="${n}ヶ月目の食材名" placeholder="食材名を入力" ${s.solved.length===m.count?'disabled':''} required>
      <button class="action" type="submit" ${s.solved.length===m.count?'disabled':''}>判定</button></form>
      <p class="feedback" role="status" aria-live="polite"></p>
      <ol class="log" data-log="${n}">${s.solved.map((index,i)=>renderFoodLog(n,index,i)).join('')}</ol></div>
      ${s.solved.length===m.count?renderPot(n):''}</div>`;
  }
  function renderPot(n) {
    const m=month(n),s=monthState(n);
    return `<div class="answer-area pot-area" data-pot="${n}">
      ${mission('今月の鍋の名前を突き止めよ！')}
      <p class="subcopy">導いた食材すべてを使って、鍋の名前を導いてください。</p>
      ${s.potSolved?`<div class="solved-name">${esc(m.pot)}</div>
        ${renderMonthAfterStory(n)}${next(n===3?'call':`m${n+1}`,n===3?'続きを読む':`${n+1}ヶ月目へ進む`)}`:
        `<form class="answer-form" data-form="pot:${n}" autocomplete="off">
          <input name="answer" aria-label="${n}ヶ月目の鍋の名前" placeholder="鍋の名前を入力" required>
          <button class="action" type="submit">判定</button></form>
          <p class="feedback" role="status" aria-live="polite"></p>`}
    </div>`;
  }
  function renderMonthAfterStory(n) {
    const passages = {
      1: [
        '届いたのは、ごく普通の鍋の食材だった。もっと驚くような組み合わせを期待していたあなたは、少し拍子抜けする。',
        'ただ、味は悪くない。初回はこんなものかもしれないと思い、次の月を楽しみに待つ。'
      ],
      2: [
        '今月は、先月と違って意外な食材が届いた。確かに驚きはあったけれど、求めていた楽しさとは少し違う。',
        '「普通すぎるのも物足りないけれど、これはこれで違うな……」そんな複雑な気持ちのまま、次の月を待つ。'
      ],
      3: [
        'ショートケーキまで鍋に入れて、実際に食べてみた。さすがに、期待していたものとは違いすぎる。',
        '食べ終えたあなたは、どうしても気になって、サービスに問い合わせることにした。'
      ]
    };
    return `<div class="narrative-block narrative-after"><h3>STORY</h3>${passages[n].map(story).join('')}</div>`;
  }
  function renderCall() {
    return panel('call',`<h2>ちょっと待って……。</h2>
      ${story('3ヶ月目の鍋を食べ終えて、とうとうサービスに問い合わせることにした。')}
      <div class="story-dialogue">${bubble('ショートケーキってなんですか？\nこれまでも変な食材が入っていましたし、まあ美味しかったんですけど……。')}
        <div class="dialogue operator"><span class="speaker">コールセンター</span><div class="bubble">いえいえ、お客様。<br>そちらは食後にお召し上がりください。</div></div>
        ${bubble('……そうだったんですね。わかりました。')}</div>
      ${story('電話を切ったあと、ふと考える。')}
      ${bubble('にしても、急にショートケーキを送ってくるなんて……。\nミステリーポットラックって、そもそも何なんだ？')}
      ${next('search','調べてみる')}`);
  }
  function renderSearch() {
    return panel('search',`<h2>ミステリーポットラックって……？</h2>
      ${story('気になって調べてみると、ある言葉が目に入った。')}
      <div class="search-note">「YAMINABE」は、日本語の「闇鍋」を表したものとしても読める。<br><br><strong>YAMINABE ＝ 闇鍋……？</strong></div>
      ${bubble('えっ……ヤミナベ！？\nこのサービスって、闇鍋のサービスだったってこと？\nもしかして、変なものを食べさせて楽しんでる……？')}
      ${story('なんだか釈然としないまま、次の月を迎えた。')}
      ${next('last','4ヶ月目へ進む')}`);
  }
  function renderLast() {
    const s=state.last;
    return panel('last',`<div class="narrative-block narrative-opening"><h2>4ヶ月目</h2>
      ${story('3ヶ月間サービスを利用したあなたのもとに、ご贔屓様への感謝を伝える特別な封筒が届く。')}
      ${story('3ヶ月目のこともあり、少し半信半疑。それでも、ここまで続けてきたのだから、最後にもう一度試してみようと思った。')}</div>
      ${img('laststep.png')}
      ${directive('4ヶ月目の封筒を開けてください。')}
      ${s.phase==='sealed'?action('開けました','last-opened'):done('開けました')}
      ${s.phase!=='sealed'?renderLastConfirm():''}`);
  }
  function renderLastConfirm() {
    const s=state.last;
    return `<div class="reveal confirm-phase" data-phase="last-confirm">
      <div class="confirm-card">
        <h3 class="confirm-heading">内容物を確認してください。</h3>
        <p>4ヶ月目に届いたものと、一枚の紙を確認してください。</p>
      </div>
      ${s.phase==='opened'?action('内容物を確認しました','last-confirmed'):done('内容物を確認しました')}
      ${s.phase==='confirmed'?renderLastPlay():''}</div>`;
  }
  function renderLastPlay() {
    const s=state.last;
    return `<div class="reveal" data-phase="last-play">
      ${mission('今月の鍋の名前を突き止めよ！')}
      <div class="answer-area"><form class="answer-form" data-form="last" autocomplete="off">
      <input name="answer" aria-label="今月の鍋の名前" placeholder="鍋の名前を入力" ${s.finalSolved?'disabled':''} required>
      <button class="action" type="submit" ${s.finalSolved?'disabled':''}>判定</button></form>
      <p class="feedback" role="status" aria-live="polite"></p>
      ${s.finalSolved?`<div class="solved-name">やみつき鍋</div>
        <div class="narrative-block narrative-after"><h3>STORY</h3>
        ${story('届いたのは、特別な食材をふんだんに使った鍋だった。奇妙な組み合わせではない。それなのに、一口食べると、思いがけないおいしさに驚いた。')}
        ${story('期待していたような鍋は、結局一度も届かなかった。それでも、この4ヶ月間を振り返ると、不思議と悪くない気分だった。')}</div>
        ${next('ending','エンディングを見る')}`:''}</div></div>`;
  }
  function renderEnding() {
    return panel('ending',`<div class="ending-image"><img src="./assets/ending-placeholder.svg" alt="エンディング画像（差し替え予定）"></div>
      <div class="narrative-block narrative-ending"><h2>まだ、決まっていない</h2>
      ${story('食事を終え、4ヶ月間を振り返る。期待外れのことも、驚きすぎて戸惑ったこともあった。それでも、最後には思いがけないおいしい鍋に出会えた。')}
      ${story('ふと、ずっと心の奥に残っていたパイロットの夢を思う。選考は厳しいし、自分に適性があるかもわからない。挑戦したとしても、夢が叶うとは限らない。')}
      ${story('でも、まだ挑戦すらしていないのに、自分には無理だと決めつけていた。それだけは、今からでも変えられる。')}
      ${story('あなたはパソコンを開き、パイロットの募集要項を調べ始めた。以前は最後まで進められなかった応募に、今度こそ向き合ってみよう。')}
      ${story('夢を叶えるための、最初の一歩を踏み出した。')}</div>`);
  }
  function buildStage(stage) {
    if(stage==='notice')return renderNotice();
    if(stage==='prep')return renderPrep();
    if(/^m[123]$/.test(stage))return renderMonth(Number(stage[1]));
    if(stage==='call')return renderCall();
    if(stage==='search')return renderSearch();
    if(stage==='last')return renderLast();
    if(stage==='ending')return renderEnding();
    return '';
  }
  function renderAll(){root.innerHTML=state.unlocked.map(buildStage).join('');}
  function feedback(form,text){const p=form.parentElement.querySelector('.feedback');if(p){p.textContent=text;}}
  function activateDebug() {
    // Developer-only shortcut: make every stage and every answer complete.
    state.unlocked = [...STAGES];
    state.prepDone = true;
    for (const m of DATA.months) {
      state.months[m.id] = {phase:'confirmed',solved:m.foods.map((_,i)=>i),potSolved:true};
    }
    state.last = {phase:'confirmed',firstSolved:true,finalSolved:true};
    save();
    closeModal();
    renderAll();
    document.getElementById('section-ending')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function checkFood(n,form) {
    if (n === 1 && norm(form.elements.answer.value) === norm('デバッグ')) {
      activateDebug();
      return;
    }
    const m=month(n),s=monthState(n);
    const index=m.foods.findIndex(f=>matches(form.elements.answer.value,[f.name,...f.aliases]));
    if(index<0){feedback(form,'その答えは違うようです。');return;}
    if(s.solved.includes(index)){feedback(form,'その食材はすでに判明しています。');return;}
    s.solved.push(index);save();
    const play=form.closest(`[data-phase="play-${n}"]`);
    play.querySelector('[data-log]').insertAdjacentHTML('beforeend',renderFoodLog(n,index,s.solved.length-1));
    play.querySelector('[data-progress]').textContent=`${s.solved.length} / ${m.count} 種類が判明しました。`;
    form.elements.answer.value='';feedback(form,'');
    const finished=s.solved.length===m.count;
    if(finished) {
      form.elements.answer.disabled=true;
      form.querySelector('button').disabled=true;
      play.insertAdjacentHTML('beforeend',renderPot(n));
    }
    showModal({comment:m.foods[index].reaction,missionText:finished?'今月の鍋の名前を突き止めよ！':''});
  }
  function checkPot(n,form) {
    const m=month(n),s=monthState(n);
    if(!matches(form.elements.answer.value,[m.pot,...m.potAliases])){feedback(form,'鍋の名前が違うようです。');return;}
    s.potSolved=true;save();
    form.closest('[data-pot]').outerHTML=renderPot(n);
    showModal({comment:m.potReaction});
  }
  function checkLast(form) {
    const value=form.elements.answer.value;
    if(matches(value,DATA.last.final)) {
      if(state.last.finalSolved)return;
      state.last.finalSolved=true;save();
      form.closest('[data-phase="last-play"]').outerHTML=renderLastPlay();
      showModal({comment:'……まさか、こんな鍋だったなんて。',missionText:'エンディングを見る',missionLabel:'この先へ'});
      return;
    }
    if(matches(value,DATA.last.initial)) {
      if(state.last.firstSolved){feedback(form,'その答えはすでに判明しています。');return;}
      state.last.firstSolved=true;save();
      form.elements.answer.value='';feedback(form,'');
      showModal({comment:'……やみなべ。やっぱり、そういうことだったのか？\nでも、これで「極上の鍋」になるのか……？',kind:'interim'});
      interimHelpPending = true;
      closeModalButton.hidden = true;
      modalBody.insertAdjacentHTML('beforeend','<div class="interim-next"><button class="action" type="button" data-modal-next>次へ進む</button></div>');
      modalBody.querySelector('[data-modal-next]').focus({preventScroll:true});
      return;
    }
    feedback(form,'その答えは違うようです。');
  }
  root.addEventListener('click',e=>{
    const btn=e.target.closest('button[data-action]');if(!btn)return;
    const key=btn.dataset.action;
    if(key.startsWith('unlock:')){unlock(key.slice(7));return;}
    if(key.startsWith('replay:')){
      const [,n,index]=key.split(':').map(Number);
      const food=month(n)?.foods[index];
      if(food && monthState(n).solved.includes(index))showModal({comment:food.reaction});
      return;
    }
    if(key==='prep-done'){
      if(state.prepDone)return;
      state.prepDone=true;save();btn.disabled=true;
      // 鍋の完成を確認したら、その操作で1ヶ月目を解禁する。二度押しをなくす。
      unlock('m1');return;
    }
    const opened=key.match(/^opened:(\d)$/);
    if(opened){
      const n=Number(opened[1]),s=monthState(n);
      if(s.phase!=='sealed')return;
      s.phase='opened';save();btn.disabled=true;
      btn.closest('.panel').insertAdjacentHTML('beforeend',renderConfirm(n));return;
    }
    const confirmed=key.match(/^confirmed:(\d)$/);
    if(confirmed){
      const n=Number(confirmed[1]),s=monthState(n);
      if(s.phase!=='opened')return;
      s.phase='confirmed';save();btn.disabled=true;
      btn.closest(`[data-phase="confirm-${n}"]`).insertAdjacentHTML('beforeend',renderPlay(n));return;
    }
    if(key==='last-opened'){
      if(state.last.phase!=='sealed')return;
      state.last.phase='opened';save();btn.disabled=true;
      btn.closest('.panel').insertAdjacentHTML('beforeend',renderLastConfirm());return;
    }
    if(key==='last-confirmed'){
      if(state.last.phase!=='opened')return;
      state.last.phase='confirmed';save();btn.disabled=true;
      btn.closest('[data-phase="last-confirm"]').insertAdjacentHTML('beforeend',renderLastPlay());
    }
  });
  root.addEventListener('compositionstart',()=>composing=true);
  root.addEventListener('compositionend',()=>composing=false);
  root.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.isComposing||e.keyCode===229||composing))e.preventDefault();});
  root.addEventListener('submit',e=>{
    const form=e.target.closest('form[data-form]');if(!form)return;
    e.preventDefault();if(composing)return;
    const [type,id]=form.dataset.form.split(':');
    if(type==='food')checkFood(Number(id),form);
    if(type==='pot')checkPot(Number(id),form);
    if(type==='last')checkLast(form);
  });
  document.getElementById('reset').addEventListener('click',()=>{
    if(!confirm('進行状況を消去して、最初からやり直しますか？'))return;
    closeModal();localStorage.removeItem(KEY);state=blank();renderAll();window.scrollTo(0,0);
  });
  renderAll();
})();
