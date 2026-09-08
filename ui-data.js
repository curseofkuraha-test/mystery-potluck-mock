/*
  画面上の見出し・説明文
  ここだけ編集すれば、各ステップの見出しや説明を差し替えられます。
  将来サーバー上で運用する場合は JSON / TXT 読み込みへ置き換え可能です。
*/
window.MYSTERY_POTLUCK_UI = {
  stage1: {
    kicker: 'TABLE / A–D',
    title: 'まずは、それぞれの答えを。',
    body: 'A〜Dで導いた食材を入力してください。どの方向から確かめても構いません。'
  },
  stage2: {
    kicker: 'TABLE / NEXT',
    title: '続きの3つへ。',
    body: '続いて導いた3つの食材を入力してください。'
  },
  stage3: {
    kicker: 'LAST QUESTION',
    title: '7つがそろった、その先へ。',
    body: '最後に導いた言葉を入力してください。'
  },
  turn: {
    kicker: 'ONE MORE QUESTION',
    title: 'まだ、席を立つには早い。',
    body: '表示された謎を解き、導いた答えを入力してください。',
    demo: '謎を解いたあと、導かれた図を実物で確かめてください。'
  },
  stage4: {
    kicker: 'TABLE / A–D',
    title: 'いま見えている4つを。',
    body: 'A〜Dから導いた食材を入力してください。'
  },
  stage5: {
    kicker: 'TABLE / NEXT',
    title: '続きの3つへ。',
    body: '続いて導いた3つの食材を入力してください。'
  },
  stage6: {
    kicker: 'LAST QUESTION',
    title: '最後に残った言葉。',
    body: '導いた言葉を入力してください。'
  },
  credits: {
    lead: '湯気の向こうに、4人分の笑い声がある。'
  }
};
