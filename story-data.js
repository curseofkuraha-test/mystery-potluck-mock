/*
  ストーリーデータ v10
  4固定キャラクター制：アリサ / ツバサ / セナ / ハルカ
  実プレイヤーは開始時に好きなキャラクターを選択しますが、台詞の読み上げは任意です。
*/
window.MYSTERY_POTLUCK_STORY = {
  characters: {
    arisa:    { display: 'アリサ', initial: 'A', tone: 'arisa', human: true },
    tsubasa:  { display: 'ツバサ', initial: 'T', tone: 'tsubasa', human: true },
    sena:     { display: 'セナ', initial: 'S', tone: 'sena', human: true },
    haruka:   { display: 'ハルカ', initial: 'H', tone: 'haruka', human: true },
    narrator: { display: '', initial: '', tone: 'narrator', human: false, narrator: true }
  },

  intro: [
    {speakerKey:'narrator', text:'玄関で靴を脱ぐなり、アリサがリュックから何か取り出した。'},
    {speakerKey:'arisa', text:'「見て見て、これ。」'},
    {speakerKey:'sena', text:'「何それ。」'},
    {speakerKey:'arisa', text:'「鍋占いだって。今夜食べる鍋の具材、占いで決めるんだって。」'},
    {speakerKey:'sena', text:'「決めるって、自分たちで決めないの？」'},
    {speakerKey:'arisa', text:'「うん。運に任せるタイプの占いらしい。ハルカ誕生日じゃん。せっかくだから今日の運、鍋で占おうよ。」'},
    {speakerKey:'haruka', text:'「（笑いながら）いいじゃん、それ。」'},
    {speakerKey:'tsubasa', text:'「おもしろそう、乗る。」'},
    {speakerKey:'sena', text:'「占いにしては手順多くない？」'},
    {speakerKey:'arisa', text:'「そこがいいんだって。」'},
    {speakerKey:'narrator', text:'四人分の椅子が、テーブルの四辺に引かれる。箱の中には、紙の鍋と、四枚のカード。それから、占いの手引き。手引きの隅に、小さく一文。'},
    {speakerKey:'narrator', text:'「結果に納得いかなかったら、こちらへ。」'},
    {speakerKey:'tsubasa', text:'「これ何？」'},
    {speakerKey:'arisa', text:'「さあ。まあ、先進めよ。」'},
    {speakerKey:'narrator', text:'特に気にせず、四人は占いを始める。'},
    {speakerKey:'narrator', text:'問題を開いた瞬間。'},
    {speakerKey:'arisa', text:'「これ、一問二問で終わるやつじゃないじゃん。」'},
    {speakerKey:'sena', text:'「ずいぶん本格的な占いだな。」'},
    {speakerKey:'arisa', text:'「ちゃんと占った方が当たりそうじゃん。」'}
  ],

  interludes: [
    [
      {speakerKey:'arisa', text:'「これ絶対ひっかけでしょ。」'},
      {speakerKey:'sena', text:'「別にひっかけじゃないと思うけど。」'},
      {speakerKey:'arisa', text:'「いや、なんか裏がありそうな顔してる、この問題。」'},
      {speakerKey:'sena', text:'「問題に顔はない。」'},
      {speakerKey:'tsubasa', text:'「（笑いながら）分かる気がする。」'}
    ],
    [
      {speakerKey:'sena', text:'「これ、思ったよりボリュームあるな。」'},
      {speakerKey:'arisa', text:'「その分、楽しめるでしょ。」'},
      {speakerKey:'sena', text:'「まあ、悪くない。」'},
      {speakerKey:'haruka', text:'「（笑って）気合入ってるよね。」'}
    ],
    [
      {speakerKey:'haruka', text:'「これ、なんか懐かしい感じの問題だね。」'},
      {speakerKey:'tsubasa', text:'「懐かしいって、初めて見るやつでしょ。」'},
      {speakerKey:'haruka', text:'「そうなんだけど、なんか。」'}
    ],
    [
      {speakerKey:'haruka', text:'「なんか、この問題だけ手触りが違う気がする。」'},
      {speakerKey:'sena', text:'「気のせいだと思う。」'},
      {speakerKey:'tsubasa', text:'「言われてみれば、そんな気もする。」'}
    ]
  ],

  afterFirst4: [
    {speakerKey:'arisa', text:'「お、カード使うやつだ。」'},
    {speakerKey:'tsubasa', text:'「（自分のカードを出しながら）これでしょ？」'},
    {speakerKey:'sena', text:'「これ、四人分ちゃんと揃えないと駄目な作りっぽいな。」'},
    {speakerKey:'haruka', text:'「じゃあ、みんなの持ってきて。」'}
  ],

  afterFirst7: [
    {speakerKey:'narrator', text:'三問を解き終え、盤面に最後の食材が浮かぶ。'},
    {speakerKey:'haruka', text:'「これで、全部揃ったかな。」'},
    {speakerKey:'sena', text:'「七つ、か。」'}
  ],

  badEnd: [
    {speakerKey:'tsubasa', text:'「よし、最後これ解けば終わりでしょ。」'},
    {speakerKey:'narrator', text:'7食材を打ち込むと、盤面に文字が浮かぶ。'},
    {speakerKey:'narrator', text:'あ ん こ く'},
    {speakerKey:'sena', text:'「あんこく…もはやそのまんまじゃん。」'},
    {speakerKey:'arisa', text:'「逆にすごくない？ 闇鍋で“あんこく”って出るの、才能でしょ。」'},
    {speakerKey:'haruka', text:'「（笑って）いや、才能とは違う気がする。」'},
    {speakerKey:'tsubasa', text:'「じゃあ完成ってこと？」'},
    {speakerKey:'sena', text:'「一応、これで終わりのはず。」'},
    {speakerKey:'narrator', text:'四人がそれぞれ、少し達成感のある顔をしている。'},
    {speakerKey:'arisa', text:'「じゃ、これで具材揃ったし、あとは――」'},
    {speakerKey:'narrator', text:'ふと見ると、いつも即座に何か言うセナが、リストの「きゅうり」の文字を見たまま黙っていた。'},
    {speakerKey:'arisa', text:'「…セナ？」'},
    {speakerKey:'sena', text:'「あ、いや。大丈夫。」'},
    {speakerKey:'tsubasa', text:'「大丈夫って顔してない。」'},
    {speakerKey:'sena', text:'「ちょっと、昔から苦手で。俺だけ別の食べるから、それで――」'},
    {speakerKey:'arisa', text:'「いや、別のはなし。」'},
    {speakerKey:'sena', text:'「でも――」'},
    {speakerKey:'arisa', text:'「4人で鍋やるって言ったじゃん。」'},
    {speakerKey:'narrator', text:'セナは少し黙って、それから小さく笑う。'},
    {speakerKey:'sena', text:'「…だよな。」'},
    {speakerKey:'haruka', text:'「じゃあ、なんとかしよう。」'},
    {speakerKey:'sena', text:'「なんとかって、具材もう決まってるけど。」'},
    {speakerKey:'haruka', text:'「なんか方法、あるといいけど。」'},
    {speakerKey:'tsubasa', text:'「あ。」'},
    {speakerKey:'narrator', text:'ツバサが、手引きの隅の一文を思い出す。'},
    {speakerKey:'tsubasa', text:'「これ、“結果に納得いかなかったら”って書いてなかったっけ。」'},
    {speakerKey:'sena', text:'「…それ、今使うことなのか？」'},
    {speakerKey:'arisa', text:'「使ってみなきゃ分かんないでしょ。」'}
  ],

  afterTurn: [
    {speakerKey:'haruka', text:'「あった、これだ。」'},
    {speakerKey:'narrator', text:'手引きの導線をたどると、模様のような、文字のような、判読しづらい図柄が現れる。'},
    {speakerKey:'sena', text:'「読めそうで読めないな。」'},
    {speakerKey:'arisa', text:'「多分、これも占いの一部でしょ。」'},
    {speakerKey:'narrator', text:'読み解くと、カードの向きが分かる。'},
    {speakerKey:'tsubasa', text:'「これ、この向きにするってこと？」'},
    {speakerKey:'narrator', text:'実際に回してみると、カード上のビジュアルが変化する。'},
    {speakerKey:'sena', text:'「え、待って。これ、隣に置くやつじゃない？」'},
    {speakerKey:'haruka', text:'「あ、ほんとだ。矢印っぽくなった。」'},
    {speakerKey:'narrator', text:'四枚のカードが、それぞれ隣の取り皿へと移動する。'},
    {speakerKey:'arisa', text:'「これでいいってこと？」'},
    {speakerKey:'sena', text:'「多分。」'}
  ],

  afterSecond4: [
    {speakerKey:'narrator', text:'カードを移動したことで、A〜Dの答えのうち一問ずつ結果が変わり、盤面の読み位置も変化する。'},
    {speakerKey:'arisa', text:'「え、待って、④の場所変わってない？」'},
    {speakerKey:'sena', text:'「カード動かしたから盤面変わったってこと？」'},
    {speakerKey:'haruka', text:'「うわ、ほんとだ。食材、変わってる。」'},
    {speakerKey:'narrator', text:'先ほどまでとは違う4つの言葉が、盤面に浮かんでいる。'},
    {speakerKey:'tsubasa', text:'「これ、きゅうり消えてる。」'},
    {speakerKey:'sena', text:'「……ほんとだ。」'},
    {speakerKey:'arisa', text:'「じゃあこれで解決？」'},
    {speakerKey:'sena', text:'「あ。」'},
    {speakerKey:'tsubasa', text:'「どうした。」'},
    {speakerKey:'sena', text:'「あのカード、さっきの共通の問題でも使ったよね。」'},
    {speakerKey:'haruka', text:'「ってことは。」'},
    {speakerKey:'arisa', text:'「あっちの結果も変わってるかも。」'},
    {speakerKey:'sena', text:'「多分、そういうこと。」'}
  ],

  afterSecond7: [
    {speakerKey:'narrator', text:'三問を解き直すと、残り3つの食材も入れ替わる。'},
    {speakerKey:'haruka', text:'「これで、七つ全部変わった。」'},
    {speakerKey:'arisa', text:'「最初のとは、もう別の鍋じゃん。」'},
    {speakerKey:'sena', text:'「じゃあ、これで。」'},
    {speakerKey:'narrator', text:'最終問題自体は、見た目もルールも先ほどと全く同じ。持ち込む7食材だけが違う。'}
  ],

  clear: [
    {speakerKey:'narrator', text:'文字が浮かぶ。'},
    {speakerKey:'narrator', text:'だ ん け つ'},
    {speakerKey:'sena', text:'「…だんけつ、って出た。」'},
    {speakerKey:'arisa', text:'「おお。」'},
    {speakerKey:'haruka', text:'「今度は鍋っぽいね。」'},
    {speakerKey:'arisa', text:'「じゃ、作ろ。」'},
    {speakerKey:'narrator', text:'実際に鍋を作り始める四人。'},
    {speakerKey:'sena', text:'「それ、まだ煮えてない。」'},
    {speakerKey:'arisa', text:'「肉ちゃんと火通して。」'},
    {speakerKey:'haruka', text:'「誰かポン酢取って。」'},
    {speakerKey:'tsubasa', text:'「熱っ。」'},
    {speakerKey:'narrator', text:'湯気の向こうで、四人が笑っている。'},
    {speakerKey:'haruka', text:'「なんか今日、久しぶりに高校の頃みたいだったな。」'},
    {speakerKey:'arisa', text:'「また集まろうよ、普通に。」'},
    {speakerKey:'sena', text:'「普通にって、また変な占い持ってくるつもりだろ。」'},
    {speakerKey:'arisa', text:'「バレた。」'},
    {speakerKey:'narrator', text:'鍋を囲む四人の声が、静かに続いていく。'}
  ]
};
