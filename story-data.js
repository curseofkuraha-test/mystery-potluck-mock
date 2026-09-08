/*
  ストーリーデータ
  speakerKey: player / natsu / minato / haru / narrator
  narrator は話者名・人物アイコンを表示しない地の文です。
  text 内の {{player}} は入力された名前に自動置換されます。

  キャラクター方針
  ナツ   : 思いついたらまずやる。場を動かす。楽しそうなら一歩踏み込む。
  ミナト : 現実派。乾いたツッコミ。食事と段取りには妙に細かい。
  ハル   : 今回の誕生日の主役。穏やか。人の様子をよく見ていて、静かに頑固。
  {{player}} : 4人の一人。プレイヤーが入り込める余白を残す。
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
    {speakerKey:'narrator', text:'高校時代からの友人4人が、久しぶりに同じテーブルへ集まった。今日はハルの誕生日だ。'},
    {speakerKey:'natsu', text:'「全員いる。しかも誕生日当日。これだけでもう、ちょっとした奇跡じゃない？」'},
    {speakerKey:'minato', text:'「奇跡は腹にたまらない。晩飯を決めよう。」'},
    {speakerKey:'haru', text:'「普通に食べるのもいいけど……久しぶりだし、昔みたいにちょっと変なことしたい。」'},
    {speakerKey:'natsu', text:'「誕生日の本人がそう言うなら話が早い。闇鍋やろう。」'},
    {speakerKey:'minato', text:'「早すぎる。」'},
    {speakerKey:'player', text:'「でも、持ってきた本人が中身を知ってたら闇鍋って感じしなくない？」'},
    {speakerKey:'haru', text:'「じゃあ、誰も中身を知らないようにしようか。」'},
    {speakerKey:'natsu', text:'「いいね。今夜の食材は、ここにある問題から決める。出てきたものに文句なし。」'},
    {speakerKey:'minato', text:'「最後の一言だけ急に契約書みたいだな。」'},
    {speakerKey:'narrator', text:'テーブルの中央には“鍋”を置く。4人はそれぞれの側から、今夜入る食材を確かめていくことにした。'}
  ],

  afterFirst4: [
    {speakerKey:'natsu', text:'「出た。4つ。」'},
    {speakerKey:'minato', text:'「まだ鍋の全貌は見えないな。」'},
    {speakerKey:'haru', text:'「こうやって一個ずつ分かると、妙に期待するね。」'},
    {speakerKey:'player', text:'「期待していい並びかは怪しいけど。」'},
    {speakerKey:'natsu', text:'「あと3つ。ここからは4人で見るやつだな。」'},
    {speakerKey:'minato', text:'「ようやく持ち寄りっぽくなってきた。」'}
  ],

  afterFirst7: [
    {speakerKey:'natsu', text:'「そろった！」'},
    {speakerKey:'minato', text:'「文字で並ぶと破壊力が増すな。」'},
    {speakerKey:'haru', text:'「マカロンが鍋に入る日は、たぶん今日しかない。」'},
    {speakerKey:'player', text:'「二度目があってたまるか。」'},
    {speakerKey:'narrator', text:'7つの食材が出そろった。まだ鍋には入れず、最後に残った答えを確かめる。'}
  ],

  badEnd: [
    {speakerKey:'natsu', text:'「……あんこく。」'},
    {speakerKey:'minato', text:'「この食材を見たあとだと、妙に説得力がある。」'},
    {speakerKey:'haru', text:'「でも、変なものが出るのは闇鍋としては正しいよね。」'},
    {speakerKey:'player', text:'「……あ。」'},
    {speakerKey:'natsu', text:'「どうした？」'},
    {speakerKey:'player', text:'「きゅうり。」'},
    {speakerKey:'minato', text:'「……ああ。」'},
    {speakerKey:'haru', text:'「高校のときの、まだ駄目？」'},
    {speakerKey:'narrator', text:'高校時代のある出来事以来、{{player}}はきゅうりだけはどうしても口にできない。アレルギーではない。それでも、無理に食べれば済む話ではなかった。'},
    {speakerKey:'player', text:'「自分だけ別のもの食べるよ。せっかくここまで決まったし。」'},
    {speakerKey:'haru', text:'「それは嫌だな。」'},
    {speakerKey:'player', text:'「今日の主役が言う？」'},
    {speakerKey:'haru', text:'「今日の主役だから言う。4人で集まれた日に、一人だけ別のもの食べるのは嫌。」'},
    {speakerKey:'natsu', text:'「まだ鍋には何も入れてない。」'},
    {speakerKey:'minato', text:'「なら、今なら間に合う。」'},
    {speakerKey:'haru', text:'「もう少しだけ、付き合って。」'}
  ],

  afterTurn: [
    {speakerKey:'player', text:'「……この図、カードを皿の上で回すのか。」'},
    {speakerKey:'haru', text:'「やってみよう。」'},
    {speakerKey:'natsu', text:'「お、なんか見え方変わった。」'},
    {speakerKey:'minato', text:'「なるほど。そっちに動かすのか。」'},
    {speakerKey:'narrator', text:'4枚のカードの位置が変わる。さっきまでと同じテーブルなのに、見えている情報はもう同じではなかった。'}
  ],

  afterSecond4: [
    {speakerKey:'natsu', text:'「え。きゅうりだけじゃない。」'},
    {speakerKey:'player', text:'「4つとも変わった……。」'},
    {speakerKey:'minato', text:'「カードが変わった分、ここも全部変わったのか。」'},
    {speakerKey:'haru', text:'「ねえ。このカード、さっき4人で見たところにも使ったよね。」'},
    {speakerKey:'natsu', text:'「……あっちも見てみる？」'},
    {speakerKey:'minato', text:'「ここまで来たら、見ない理由はないな。」'}
  ],

  afterSecond7: [
    {speakerKey:'natsu', text:'「今度は鍋だ。ちゃんと鍋だ！」'},
    {speakerKey:'minato', text:'「大根、しいたけ、豚肉、人参、白菜、もつ、もやし。ようやく火を使っていい顔ぶれになった。」'},
    {speakerKey:'haru', text:'「{{player}}、これは？」'},
    {speakerKey:'player', text:'「大丈夫。全部食べられる。」'},
    {speakerKey:'natsu', text:'「よし。」'},
    {speakerKey:'minato', text:'「まだ入れるなよ。」'},
    {speakerKey:'natsu', text:'「分かってるって。」'},
    {speakerKey:'haru', text:'「さっきもその会話した気がする。」'}
  ],

  clear: [
    {speakerKey:'natsu', text:'「……だんけつ。」'},
    {speakerKey:'haru', text:'「ふふ。今の私たちみたい。」'},
    {speakerKey:'minato', text:'「よし。今度こそ鍋にする。肉とモツはちゃんと火を通す。」'},
    {speakerKey:'natsu', text:'「余韻を生活指導で消すなよ。」'},
    {speakerKey:'player', text:'「でもそこは大事。」'},
    {speakerKey:'narrator', text:'やがて湯気が上がる。誰かが具材を足し、誰かが器を差し出し、誰かが話の続きを始める。'},
    {speakerKey:'haru', text:'「今年の誕生日、これでよかった。」'},
    {speakerKey:'natsu', text:'「言い切った。」'},
    {speakerKey:'minato', text:'「次は普通の鍋にしよう。」'},
    {speakerKey:'natsu', text:'「それ、次も4人で集まる前提？」'},
    {speakerKey:'player', text:'「じゃあ、次の日程は食べながら決めよう。」'},
    {speakerKey:'narrator', text:'学生の頃みたいに、いつでも集まれるわけじゃない。それでも、同じ食卓を囲む時間は、また作れる。'}
  ]
};
