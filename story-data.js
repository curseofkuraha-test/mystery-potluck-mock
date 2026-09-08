/*
  ストーリーデータ v8
  ユーザー指定の「通しセリフ台本」をWEB進行用に分割したものです。
  speakerKey: player / natsu / minato / haru / narrator
  narrator は話者名・人物アイコンを表示しない地の文です。
  text 内の {{player}} は入力された名前に自動置換されます。
*/
window.MYSTERY_POTLUCK_STORY = {
  characters: {
    player:   { display: '{{player}}', initial: '{{playerInitial}}', tone: 'you', human: true },
    natsu:    { display: 'ナツ', initial: 'N', tone: 'natsu', human: true },
    minato:   { display: 'ミナト', initial: 'M', tone: 'minato', human: true },
    haru:     { display: 'ハル', initial: 'H', tone: 'haru', human: true },
    narrator: { display: '', initial: '', tone: 'narrator', human: false, narrator: true }
  },

  intro: [
    {speakerKey:'narrator', text:'玄関で靴を脱ぐなり、ナツがリュックから何か取り出した。'},
    {speakerKey:'natsu', text:'「見て見て、これ。」'},
    {speakerKey:'minato', text:'「何それ。」'},
    {speakerKey:'natsu', text:'「福袋みたいなやつなんだけど、開けるだけじゃなくて、謎解いた分だけ具材が決まるらしくて。おもしろそうだったから買った。」'},
    {speakerKey:'minato', text:'「絶対面倒くさいやつじゃん、それ。」'},
    {speakerKey:'natsu', text:'「面倒くさいのが楽しいんだよ。」'},
    {speakerKey:'haru', text:'「（笑いながら）いいじゃん、せっかくだし。誕生日にちょうどいい。」'},
    {speakerKey:'minato', text:'「お前が言うなら、まあ。」'},
    {speakerKey:'narrator', text:'四人分の椅子が、テーブルの四辺に引かれる。箱の中には、紙の鍋と、四枚のカードが入っていた。'},
    {speakerKey:'natsu', text:'「{{player}}もほら、座って座って。」'},
    {speakerKey:'haru', text:'「じゃ、開けよっか。」'},
    {speakerKey:'narrator', text:'箱の底に、小さな紙の封筒がもう一つ入っていることに、この時点では誰も気づいていない。'}
  ],

  // 28問進行中に任意で挿入する脱線会話ストック。現モックでは自動表示しません。
  interludes: [
    [
      {speakerKey:'natsu', text:'「これ絶対ひっかけでしょ。」'},
      {speakerKey:'minato', text:'「別にひっかけじゃないと思うけど。」'},
      {speakerKey:'natsu', text:'「いや、なんか裏がありそうな顔してる、この問題。」'},
      {speakerKey:'minato', text:'「問題に顔はない。」'}
    ],
    [
      {speakerKey:'minato', text:'「この問題、量多くない？」'},
      {speakerKey:'natsu', text:'「多いほうが盛り上がるでしょ。」'},
      {speakerKey:'minato', text:'「盛り上がりと解きやすさは別。」'},
      {speakerKey:'haru', text:'「（笑って）まあまあ。」'}
    ],
    [
      {speakerKey:'haru', text:'「これ、なんか懐かしい感じの問題だね。」'},
      {speakerKey:'natsu', text:'「懐かしいって、初めて見るやつでしょ。」'},
      {speakerKey:'haru', text:'「そうなんだけど、なんか。」'}
    ],
    [
      {speakerKey:'haru', text:'「なんか、この問題だけ手触りが違う気がする。」'},
      {speakerKey:'minato', text:'「気のせいだと思う。」'},
      {speakerKey:'haru', text:'「かもね。」'}
    ]
  ],

  // 4食材が揃い、共通3問へ進む直前。
  afterFirst4: [
    {speakerKey:'natsu', text:'「お、カード使うやつだ。」'},
    {speakerKey:'minato', text:'「これ、四人分ちゃんと揃えないと駄目な作りっぽいな。」'},
    {speakerKey:'haru', text:'「じゃあ、みんなの持ってきて。」'},
    {speakerKey:'natsu', text:'「はいはい。」'}
  ],

  // 共通3問を終え、7食材が揃った直後。
  afterFirst7: [
    {speakerKey:'narrator', text:'三問を解き終え、盤面に最後の食材が浮かぶ。'},
    {speakerKey:'haru', text:'「これで、全部揃ったかな。」'},
    {speakerKey:'minato', text:'「七つ、か。」'}
  ],

  // 「あんこく」正解後〜付属封筒発見まで。
  badEnd: [
    {speakerKey:'natsu', text:'「よし、最後これ解けば終わりでしょ。」'},
    {speakerKey:'narrator', text:'7食材を打ち込むと、盤面に文字が浮かぶ。'},
    {speakerKey:'narrator', text:'あ ん こ く'},
    {speakerKey:'minato', text:'「あんこく…もはやそのまんまじゃん。」'},
    {speakerKey:'natsu', text:'「逆にすごくない？闇鍋で“あんこく”って出るの、才能でしょ。」'},
    {speakerKey:'haru', text:'「（笑って）いや、才能とは違う気がする。」'},
    {speakerKey:'natsu', text:'「じゃあ完成ってこと？」'},
    {speakerKey:'minato', text:'「一応、これで終わりのはず。」'},
    {speakerKey:'narrator', text:'四人がそれぞれ、少し達成感のある顔をしている。'},
    {speakerKey:'natsu', text:'「じゃ、これで具材揃ったし、あとは――」'},
    {speakerKey:'narrator', text:'ふと見ると、ミナトだけ、リストの「きゅうり」の文字から目を逸らしていた。'},
    {speakerKey:'player', text:'「…ミナト？」'},
    {speakerKey:'minato', text:'「あ、いや。大丈夫。」'},
    {speakerKey:'natsu', text:'「大丈夫って顔してない。」'},
    {speakerKey:'minato', text:'「ちょっと、昔から苦手で。俺だけ別の食べるから、それで――」'},
    {speakerKey:'natsu', text:'「いや、別のはなし。」'},
    {speakerKey:'minato', text:'「でも――」'},
    {speakerKey:'natsu', text:'「4人で鍋やるって言ったじゃん。」'},
    {speakerKey:'narrator', text:'ミナトは少し黙って、それから小さく笑う。'},
    {speakerKey:'minato', text:'「…だよな。」'},
    {speakerKey:'haru', text:'「じゃあ、なんとかしよう。」'},
    {speakerKey:'minato', text:'「なんとかって、具材もう決まってるけど。」'},
    {speakerKey:'haru', text:'「決まってるなら、変えればいいだけじゃない？」'},
    {speakerKey:'haru', text:'「そういえばこれ、まだ触ってなくない？」'},
    {speakerKey:'narrator', text:'箱の底に残っていた、小さな紙の封筒。'},
    {speakerKey:'minato', text:'「なんかまだ何か仕込まれてそう、このキット。」'},
    {speakerKey:'natsu', text:'「開けてみよ。」'},
    {speakerKey:'narrator', text:'封筒の中には、一枚の紙。何かの手がかりが記されている。'},
    {speakerKey:'haru', text:'「これ、解けって書いてある、ってことだよね。」'},
    {speakerKey:'minato', text:'「他に読み方ある？」'}
  ],

  // 封筒の謎に正解し、カードの操作へ移った直後。
  afterTurn: [
    {speakerKey:'narrator', text:'謎を解くと、カードの回し方が分かる。'},
    {speakerKey:'natsu', text:'「これ、回るんだ。」'},
    {speakerKey:'narrator', text:'実際に回してみると、カード上のビジュアルが変化する。'},
    {speakerKey:'minato', text:'「え、待って。これ、隣に置くやつじゃない？」'},
    {speakerKey:'haru', text:'「あ、ほんとだ。矢印っぽくなった。」'},
    {speakerKey:'narrator', text:'四枚のカードが、それぞれ隣の取り皿へと移動する。'},
    {speakerKey:'natsu', text:'「これでいいってこと？」'},
    {speakerKey:'minato', text:'「多分。」'}
  ],

  // カード移動後、A〜D由来の4食材が変わった直後。
  afterSecond4: [
    {speakerKey:'narrator', text:'カードを移動したことで、A〜Dの答えのうち一問ずつ結果が変わり、盤面の読み位置も変化する。'},
    {speakerKey:'natsu', text:'「え、待って、④の場所変わってない？」'},
    {speakerKey:'minato', text:'「カード動かしたから盤面変わったってこと？」'},
    {speakerKey:'haru', text:'「うわ、ほんとだ。食材、変わってる。」'},
    {speakerKey:'narrator', text:'先ほどまでとは違う4つの言葉が、盤面に浮かんでいる。'},
    {speakerKey:'player', text:'「これ、きゅうり消えてる。」'},
    {speakerKey:'minato', text:'「……ほんとだ。」'},
    {speakerKey:'natsu', text:'「じゃあこれで解決？」'},
    {speakerKey:'haru', text:'「待って、まだ3つ残ってる。」'},
    {speakerKey:'minato', text:'「あ。」'},
    {speakerKey:'natsu', text:'「どうした。」'},
    {speakerKey:'minato', text:'「あのカード、さっきの共通の問題でも使ったよね。」'},
    {speakerKey:'haru', text:'「ってことは。」'},
    {speakerKey:'natsu', text:'「もう一回解けってこと？」'},
    {speakerKey:'minato', text:'「多分、そういうこと。」'}
  ],

  // 共通3問を解き直し、7食材すべてが変わった直後。
  afterSecond7: [
    {speakerKey:'narrator', text:'三問を解き直すと、残り3つの食材も入れ替わる。'},
    {speakerKey:'haru', text:'「これで、七つ全部変わった。」'},
    {speakerKey:'natsu', text:'「最初のとは、もう別の鍋じゃん。」'},
    {speakerKey:'minato', text:'「じゃあ、もう一回。」'},
    {speakerKey:'narrator', text:'最終問題自体は、見た目もルールも先ほどと全く同じ。持ち込む7食材だけが違う。'}
  ],

  // 「だんけつ」正解後〜エンディング。
  clear: [
    {speakerKey:'narrator', text:'文字が浮かぶ。'},
    {speakerKey:'narrator', text:'だ ん け つ'},
    {speakerKey:'minato', text:'「…だんけつ、って出た。」'},
    {speakerKey:'narrator', text:'少しの間、誰も何も言わなかった。'},
    {speakerKey:'natsu', text:'「なんか、ちゃんと四人で解いた感じする。」'},
    {speakerKey:'haru', text:'「うん。」'},
    {speakerKey:'minato', text:'「まあ、悪くない。」'},
    {speakerKey:'narrator', text:'実際に鍋を作り始める四人。'},
    {speakerKey:'minato', text:'「それ、まだ煮えてない。」'},
    {speakerKey:'natsu', text:'「肉ちゃんと火通して。」'},
    {speakerKey:'haru', text:'「誰かポン酢取って。」'},
    {speakerKey:'player', text:'「熱っ。」'},
    {speakerKey:'narrator', text:'湯気の向こうで、四人が笑っている。'},
    {speakerKey:'haru', text:'「なんか今日、久しぶりに高校の頃みたいだったな。」'},
    {speakerKey:'natsu', text:'「また集まろうよ、普通に。」'},
    {speakerKey:'minato', text:'「普通にって、また変なキット持ってくるつもりだろ。」'},
    {speakerKey:'natsu', text:'「バレた。」'},
    {speakerKey:'narrator', text:'鍋を囲む四人の声が、静かに続いていく。'}
  ]
};
