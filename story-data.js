/*
  ストーリーデータ
  speakerKey: player / natsu / minato / haru / system
  text 内の {{player}} は、プレイヤーが入力した名前に自動置換されます。
*/
window.MYSTERY_POTLUCK_STORY = {
  characters: {
    player: { display: '{{player}}', initial: '{{playerInitial}}', tone: 'you', human: true },
    natsu:   { display: 'ナツ', initial: 'N', tone: 'natsu', human: true },
    minato:  { display: 'ミナト', initial: 'M', tone: 'minato', human: true },
    haru:    { display: 'ハル', initial: 'H', tone: 'haru', human: true },
    system:  { display: 'SYSTEM', initial: '!', tone: 'system', human: false }
  },

  intro: [
    {speakerKey:'system', text:'今日は、{{player}}の誕生日。高校時代からの友人4人が、久しぶりに同じテーブルへ集まった。'},
    {speakerKey:'natsu', text:'「全員そろった！　社会人4人の予定が同じ日に空くって、もうそれだけでイベントじゃない？」'},
    {speakerKey:'minato', text:'「テンション上げる前に注文決めよう。腹減った。」'},
    {speakerKey:'haru', text:'「でも普通に食べて帰るだけだと、ちょっともったいない気もする。」'},
    {speakerKey:'natsu', text:'「それ。久しぶりなんだし、昔みたいに“やってる時間そのものが楽しいやつ”にしようよ。」'},
    {speakerKey:'minato', text:'「その言い方をすると、だいたい面倒なことが始まる。」'},
    {speakerKey:'natsu', text:'「闇鍋。」'},
    {speakerKey:'minato', text:'「ほら始まった。」'},
    {speakerKey:'haru', text:'「やるなら徹底しよう。誰か一人だけ自分の食材を知ってるのも、ちょっと違うよね。」'},
    {speakerKey:'natsu', text:'「じゃあ4人とも知らない。何が入るかは、謎を解いて決める。」'},
    {speakerKey:'player', text:'「……誕生日の夕飯を、完全に運任せにしてない？」'},
    {speakerKey:'haru', text:'「謎任せ。少しだけ知的。」'},
    {speakerKey:'system', text:'中央に“鍋”を置き、4方向の謎に挑戦しよう。どの方向から始めても構わない。相談も自由だ。'}
  ],

  afterFirst4: [
    {speakerKey:'natsu', text:'「4つ出た！　誰が先に解くかで順番が変わるの、ほんとに闇鍋っぽい。」'},
    {speakerKey:'minato', text:'「“っぽい”で済む食材ならいいけどな。」'},
    {speakerKey:'haru', text:'「まだ3つ残ってる。今度は4人の手がかりを一緒に使うみたい。」'},
    {speakerKey:'player', text:'「ここからは担当関係なし？」'},
    {speakerKey:'natsu', text:'「全員でいこう。{{player}}の誕生日なんだから、最後まで全員巻き込む。」'}
  ],

  afterFirst7: [
    {speakerKey:'natsu', text:'「7つ、そろったー！」'},
    {speakerKey:'minato', text:'「……一覧にすると急に圧があるな。」'},
    {speakerKey:'haru', text:'「闇鍋としては、かなり正しい気がする。」'},
    {speakerKey:'player', text:'「“正しい闇鍋”って、褒めてる？」'},
    {speakerKey:'minato', text:'「まだ鍋には入れるなよ。最後の謎が残ってる。」'},
    {speakerKey:'natsu', text:'「この7つで、今夜の行方まで分かるらしいよ。」'}
  ],

  badEnd: [
    {speakerKey:'system', text:'あんこく'},
    {speakerKey:'natsu', text:'「……あんこく。」'},
    {speakerKey:'minato', text:'「否定しづらい。」'},
    {speakerKey:'haru', text:'「でも、闇鍋なんだから変な食材が出ること自体は成功だよね。」'},
    {speakerKey:'player', text:'「……待って。」'},
    {speakerKey:'player', text:'「きゅうり、入ってる。」'},
    {speakerKey:'minato', text:'「あ。」'},
    {speakerKey:'natsu', text:'「……ごめん。それ忘れてた。」'},
    {speakerKey:'haru', text:'「高校のときの、あれ。」'},
    {speakerKey:'system', text:'高校時代。ふざけて始めた罰ゲームで、{{player}}は無理をしてきゅうりを食べ続け、本気で体調を崩した。それ以来、匂いだけでも当時の感覚を思い出してしまう。'},
    {speakerKey:'player', text:'「大丈夫。闇鍋なんだから仕方ないよ。自分だけ別のもの食べればいいし。」'},
    {speakerKey:'natsu', text:'「それはダメ。」'},
    {speakerKey:'player', text:'「即答。」'},
    {speakerKey:'natsu', text:'「だって今日、4人で一つの鍋を囲むためにこれやってるんでしょ。主役だけ別メニューって、一番違うじゃん。」'},
    {speakerKey:'minato', text:'「まだ何も鍋には入れてない。だったら、きゅうりが出た流れを一度見直す余地はある。」'},
    {speakerKey:'haru', text:'「1つ変えられれば、それでいい。まずはそこから考えよう。」'},
    {speakerKey:'system', text:'このままでは、4人で同じ鍋を囲むことができない。手元の情報を使って、状況を変える方法を導こう。'}
  ],

  afterTurn: [
    {speakerKey:'player', text:'「この図……カードを、取り皿の上で回す？」'},
    {speakerKey:'haru', text:'「たぶん。今までの問題でやってきた“回す”とは、少し使い方が違う。」'},
    {speakerKey:'natsu', text:'「やってみよう。考えて分からないなら、手を動かす！」'},
    {speakerKey:'minato', text:'「ナツが言うと雑に聞こえるけど、今回は賛成。」'},
    {speakerKey:'system', text:'導いた図のとおり、実物のカードを取り皿の上で回してみよう。'},
    {speakerKey:'player', text:'「……あ。」'},
    {speakerKey:'haru', text:'「動きが、皿の外まで続いてる。」'},
    {speakerKey:'natsu', text:'「これ、隣に渡すってことじゃない？」'},
    {speakerKey:'minato', text:'「1枚だけじゃない。ほかの3枚も同じ動きになる。」'},
    {speakerKey:'system', text:'4枚のカードを、現れた動きのとおりに移動させよう。'}
  ],

  afterSecond4: [
    {speakerKey:'natsu', text:'「変わった！　きゅうりだけじゃない。4つとも全部違う！」'},
    {speakerKey:'player', text:'「1個だけどうにかするつもりだったのに。」'},
    {speakerKey:'minato', text:'「カードの組み合わせ自体が変わったんだ。そりゃ影響も一つじゃ済まないか。」'},
    {speakerKey:'haru', text:'「……このカード、4人で解いた3問にも使ったよね。」'},
    {speakerKey:'natsu', text:'「あ。」'},
    {speakerKey:'minato', text:'「その顔、俺も今した。」'},
    {speakerKey:'haru', text:'「今の配置でもう一度解いたら、残り3つも変わるかもしれない。」'}
  ],

  afterSecond7: [
    {speakerKey:'natsu', text:'「大根、しいたけ、豚肉、人参、白菜、もつ、もやし！」'},
    {speakerKey:'minato', text:'「急に安心感がすごい。」'},
    {speakerKey:'haru', text:'「今度は、{{player}}も含めて4人で食べられる。」'},
    {speakerKey:'player', text:'「最初は1個だけ変えたかったのに、まるごと別の鍋になったな。」'},
    {speakerKey:'natsu', text:'「でも最後の謎、見覚えあるよ。」'},
    {speakerKey:'minato', text:'「同じ問題だ。変わったのは、ここまで持ってきた答えの方。」'},
    {speakerKey:'system', text:'同じ最後の謎に、新しく導いた7つの食材を使おう。'}
  ],

  clear: [
    {speakerKey:'system', text:'だんけつ'},
    {speakerKey:'natsu', text:'「……だんけつ。」'},
    {speakerKey:'haru', text:'「今やったこと、そのままだね。」'},
    {speakerKey:'minato', text:'「よし。今度こそ鍋にするぞ。肉とモツはちゃんと火を通す。闇鍋でもそこは普通に守る。」'},
    {speakerKey:'natsu', text:'「はいはい、鍋奉行よろしく。」'},
    {speakerKey:'player', text:'「誕生日なのに、自分で取り分ける流れ？」'},
    {speakerKey:'haru', text:'「今日は全員参加だから。」'},
    {speakerKey:'system', text:'湯気の向こうで、誰かが具材を足し、誰かが器を差し出し、誰かがくだらない話を続けている。'},
    {speakerKey:'natsu', text:'「次いつ4人そろう？」'},
    {speakerKey:'minato', text:'「食べ始める前から次回の日程調整するな。」'},
    {speakerKey:'haru', text:'「でも、決めないとまた半年後になりそう。」'},
    {speakerKey:'player', text:'「……じゃあ、鍋食べながら決めよう。」'},
    {speakerKey:'system', text:'学生の頃みたいに、いつでも集まれるわけじゃない。それでも、同じ鍋を囲む時間は、また作れる。'}
  ]
};
