/*
  ストーリーデータ v7
  speakerKey: player / natsu / minato / haru / narrator
  narrator は話者名・人物アイコンを表示しない地の文です。
  text 内の {{player}} は入力された名前に自動置換されます。

  作品方針
  - 劇中で「謎解きゲームを遊ぶ」とは扱わない。
  - 市販の福袋型闇鍋キットを使い、謎は今夜の具材を決める仕組みとして存在する。
  - あんこくは失敗表示ではなく、1回目の7食材から正しく導かれる言葉。
  - 誕生日の主役はハル。きゅうりを強く苦手としているのはミナト。
  - 団結を台詞で説明しすぎず、カードを渡す／鍋を囲む行動で見せる。

  キャラクター
  ナツ   : 思いついたら即行動。変な食材ほど喜ぶ。「まずそう」は褒め言葉。
  ミナト : 現実派。鍋として成立するかを真剣に検証する。きゅうりにだけ反応が崩れる。
  ハル   : 誕生日の主役。穏やかな観察役。実は食への執着が強い。要所で静かに核心を突く。
  {{player}} : 4人目。固定人格は薄く、素直な反応を中心にする。
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
    {speakerKey:'narrator', text:'高校時代からの友人4人が、久しぶりに同じテーブルへ集まった。今日はハルの誕生日。全員が当日にそろうのは、随分久しぶりだった。'},
    {speakerKey:'natsu', text:'「というわけで、今日の主役にプレゼント。」'},
    {speakerKey:'minato', text:'「そのサイズで食べ物じゃなかったら帰るぞ。」'},
    {speakerKey:'natsu', text:'「食べ物になるやつ。たぶん。」'},
    {speakerKey:'haru', text:'「“たぶん”が付くプレゼント初めてかも。」'},
    {speakerKey:'narrator', text:'ナツが取り出したのは、福袋のように中身の分からない闇鍋キットだった。書かれた謎を解いた分だけ、今夜の具材が決まっていくらしい。'},
    {speakerKey:'natsu', text:'「自分で選んだ具材を持ち寄るより、全員なにが入るか分からない方が闇鍋っぽくない？」'},
    {speakerKey:'minato', text:'「理屈は分かる。食事として成立する保証が一切ないだけで。」'},
    {speakerKey:'haru', text:'「いいじゃん。普通にご飯食べるより、今日はそっちがいい。」'},
    {speakerKey:'player', text:'「誕生日の本人が言うなら、やるしかないね。」'},
    {speakerKey:'natsu', text:'「決まり。出てきた具材に文句なし。」'},
    {speakerKey:'minato', text:'「俺は文句を言う。入れるけど文句は言う。」'},
    {speakerKey:'narrator', text:'中央に“鍋”を置き、4人はそれぞれの方向から、今夜の具材を確かめていくことにした。キットの隅には、小さな紙封筒がひとつ残っていた。誰も気に留めなかった。'}
  ],

  afterFirst4: [
    {speakerKey:'natsu', text:'「4つ出た。もう楽しい。」'},
    {speakerKey:'minato', text:'「俺はまだ鍋として評価を保留してる。」'},
    {speakerKey:'haru', text:'「ミナト、本当に料理の審査みたいな顔してるね。」'},
    {speakerKey:'minato', text:'「口に入るものだからな。」'},
    {speakerKey:'player', text:'「あと3つで評価がひっくり返るかも。」'},
    {speakerKey:'natsu', text:'「むしろもっと訳分かんなくなってほしい。」'},
    {speakerKey:'minato', text:'「願うな。」'},
    {speakerKey:'narrator', text:'残る3つは、4人のカードを使って確かめる。まだ、どんな鍋になるかは誰にも分からない。'}
  ],

  afterFirst7: [
    {speakerKey:'narrator', text:'7つの食材が出そろった。コンソメ、マカロン、きゅうり、コウイカ、黒豆、小豆、飴。'},
    {speakerKey:'natsu', text:'「最高。」'},
    {speakerKey:'minato', text:'「何を見て最高と言った？」'},
    {speakerKey:'natsu', text:'「マカロンとイカが同じ鍋に入る未来。」'},
    {speakerKey:'haru', text:'「小豆と飴までいるから、甘い方にも逃げられるね。」'},
    {speakerKey:'minato', text:'「逃げ道を増やすな。鍋に戻ってこい。」'},
    {speakerKey:'player', text:'「まだ入れないんだよね？」'},
    {speakerKey:'haru', text:'「うん。最後に、この7つから出る言葉を確かめてから。」'},
    {speakerKey:'narrator', text:'食材はまだ鍋へ入れない。4人は、そろった7つを使って最後の言葉を導く。'}
  ],

  badEnd: [
    {speakerKey:'natsu', text:'「……あんこく。」'},
    {speakerKey:'minato', text:'「この並びから出ると、妙に納得するのが腹立つ。」'},
    {speakerKey:'haru', text:'「闇鍋から“あんこく”。かなりそれっぽい。」'},
    {speakerKey:'natsu', text:'「よし。じゃ、具材そろえ――」'},
    {speakerKey:'narrator', text:'ナツが食材の一覧へ手を伸ばしたとき、ミナトだけが動かなかった。さっきまで一番細かく中身を確認していたのに、「きゅうり」の文字から目を逸らしている。'},
    {speakerKey:'player', text:'「ミナト？」'},
    {speakerKey:'minato', text:'「……きゅうり、入るんだよな。」'},
    {speakerKey:'haru', text:'「まだ駄目？」'},
    {speakerKey:'narrator', text:'高校時代のある出来事以来、ミナトはきゅうりだけはどうしても口にできない。アレルギーではない。それでも、無理に食べれば済む話でもなかった。'},
    {speakerKey:'minato', text:'「気にしなくていい。俺だけ別の食べるから。」'},
    {speakerKey:'natsu', text:'「それはなし。」'},
    {speakerKey:'minato', text:'「闇鍋なんだから、こういうこともあるだろ。」'},
    {speakerKey:'natsu', text:'「あるけど。4人で鍋やるって言ったじゃん。」'},
    {speakerKey:'haru', text:'「まだ何も入れてないしね。」'},
    {speakerKey:'player', text:'「今なら、まだ考えられる。」'},
    {speakerKey:'narrator', text:'テーブルの上を見渡したハルが、端に残っていた小さな封筒へ目を留めた。'},
    {speakerKey:'haru', text:'「……これ、まだ開けてなくない？」'},
    {speakerKey:'minato', text:'「あったな、そんなの。」'},
    {speakerKey:'natsu', text:'「説明書の予備かと思ってた。」'},
    {speakerKey:'haru', text:'「開けてみよ。」'}
  ],

  afterTurn: [
    {speakerKey:'narrator', text:'封筒の中の謎から分かったのは、取り皿の上にあるカードを回すことだった。'},
    {speakerKey:'player', text:'「この向きまで回す……ってことかな。」'},
    {speakerKey:'haru', text:'「やってみよう。」'},
    {speakerKey:'narrator', text:'4枚のカードをそれぞれ回す。すると、カードと取り皿の絵柄がつながり、今までとは違う方向へ続く形が現れた。'},
    {speakerKey:'natsu', text:'「あ、これ。隣に渡すんじゃない？」'},
    {speakerKey:'minato', text:'「4枚とも行き先が出てる。なら、そういうことだな。」'},
    {speakerKey:'narrator', text:'カードだけが、ひとつ隣の取り皿へ移る。取り皿も鍋も、元の場所からは動いていない。それでも、テーブルの見え方は確かに変わった。'}
  ],

  afterSecond4: [
    {speakerKey:'natsu', text:'「え。きゅうりだけじゃない。」'},
    {speakerKey:'player', text:'「4つとも違う食材になった。」'},
    {speakerKey:'minato', text:'「カードの位置が変わって、問題も読む場所も変わったからか。」'},
    {speakerKey:'haru', text:'「……このカード、さっき4人で使った3問にも使ったよね。」'},
    {speakerKey:'natsu', text:'「あ。」'},
    {speakerKey:'minato', text:'「そこも今のカードで見るなら、同じ答えにはならないかもしれない。」'},
    {speakerKey:'player', text:'「じゃあ、そっちも確かめよう。」'}
  ],

  afterSecond7: [
    {speakerKey:'narrator', text:'新しくそろった7つは、大根、しいたけ、豚肉、人参、白菜、もつ、もやし。'},
    {speakerKey:'natsu', text:'「鍋だ！」'},
    {speakerKey:'minato', text:'「ようやく名詞として安心できる並びになった。」'},
    {speakerKey:'haru', text:'「ミナト、これは全部大丈夫？」'},
    {speakerKey:'minato', text:'「問題ない。」'},
    {speakerKey:'natsu', text:'「じゃあ入れよう。」'},
    {speakerKey:'minato', text:'「まだ。最後の言葉が残ってる。」'},
    {speakerKey:'natsu', text:'「今日いちばん鍋を待ってるの、ミナトじゃん。」'},
    {speakerKey:'minato', text:'「だから順番を守ってる。」'},
    {speakerKey:'haru', text:'「ふふ。じゃあ、もう一回だけ。」'}
  ],

  clear: [
    {speakerKey:'minato', text:'「……だんけつ。」'},
    {speakerKey:'natsu', text:'「おお。」'},
    {speakerKey:'haru', text:'「今度は、ちゃんと鍋っぽいね。」'},
    {speakerKey:'natsu', text:'「じゃ、作ろ。」'},
    {speakerKey:'minato', text:'「肉ともつはちゃんと火を通せ。」'},
    {speakerKey:'natsu', text:'「余韻が一秒だった。」'},
    {speakerKey:'player', text:'「でもそこは大事。」'},
    {speakerKey:'narrator', text:'やがて鍋から湯気が上がる。誰かが具材を足し、誰かが器を寄せ、誰かがポン酢を探す。'},
    {speakerKey:'minato', text:'「それ、まだ煮えてない。」'},
    {speakerKey:'natsu', text:'「分かってるって。」'},
    {speakerKey:'haru', text:'「ポン酢、こっち。」'},
    {speakerKey:'player', text:'「熱っ。」'},
    {speakerKey:'haru', text:'「……なんか今日、久しぶりに高校の頃みたいだったな。」'},
    {speakerKey:'natsu', text:'「また集まろうよ。普通に。」'},
    {speakerKey:'minato', text:'「次は普通の鍋で。」'},
    {speakerKey:'natsu', text:'「そこは考えとく。」'},
    {speakerKey:'narrator', text:'学生の頃みたいに、いつでも集まれるわけじゃない。それでも、同じ食卓を囲む時間は、また作れる。'}
  ]
};
