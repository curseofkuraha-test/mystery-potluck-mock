/*
  ストーリーデータ
  speakerKey: player / natsu / minato / haru / system
  text 内の {{player}} は、プレイヤーが入力した名前に自動置換されます。

  キャラクター方針（仮）
  ナツ   : 思いついたら即やる。場を動かす。勢いはあるが他人を置いていかない。
  ミナト : 現実派。乾いたツッコミ。食事や段取りには妙に細かい。
  ハル   : 今回の誕生日の主役。穏やかだが、面白そうなことには静かに乗る。
  {{player}} : 4人の一人。固定人格をつけすぎず、プレイヤーが入り込める余白を残す。
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
    {speakerKey:'system', text:'高校時代からの友人4人が、久しぶりに同じテーブルへ集まった。今日はハルの誕生日だ。'},
    {speakerKey:'natsu', text:'「全員いる。しかも誕生日当日。これ、もう十分すごくない？」'},
    {speakerKey:'minato', text:'「すごいからって空腹は消えない。先に何食うか決めよう。」'},
    {speakerKey:'haru', text:'「普通に食べて帰るのもいいけど……せっかくなら、ちょっとだけ変なことしたい。」'},
    {speakerKey:'natsu', text:'「誕生日の本人から許可が出ました。」'},
    {speakerKey:'minato', text:'「その言い方、ろくな提案じゃないな。」'},
    {speakerKey:'natsu', text:'「闇鍋。」'},
    {speakerKey:'minato', text:'「ほら。」'},
    {speakerKey:'haru', text:'「でも、持ち寄った本人だけ中身を知ってる闇鍋って、少しずるくない？」'},
    {speakerKey:'player', text:'「じゃあ、4人とも何が入るか知らない状態にする？」'},
    {speakerKey:'natsu', text:'「それ。何が出るかは、解いてからのお楽しみ。」'},
    {speakerKey:'minato', text:'「食事を謎に委ねるの、かなり勇気あるな。」'},
    {speakerKey:'haru', text:'「だから面白いんじゃない？」'},
    {speakerKey:'system', text:'中央の“鍋”は動かさず、必要な方向から確かめながら進めよう。相談は自由だ。'}
  ],

  afterFirst4: [
    {speakerKey:'natsu', text:'「4つそろった！」'},
    {speakerKey:'minato', text:'「まだ評価は保留。鍋は最後まで見ないと分からない。」'},
    {speakerKey:'haru', text:'「でも、誰から先に分かるかで空気が変わるのは面白いね。」'},
    {speakerKey:'player', text:'「まだ3つあるんだよな。」'},
    {speakerKey:'natsu', text:'「ここからは4人分まとめて使うやつ。全員集合。」'},
    {speakerKey:'minato', text:'「最初から全員いる。」'}
  ],

  afterFirst7: [
    {speakerKey:'natsu', text:'「全部そろった！」'},
    {speakerKey:'minato', text:'「文字で並ぶと、急に現実味が出るな。」'},
    {speakerKey:'haru', text:'「闇鍋としては、かなり立派。」'},
    {speakerKey:'player', text:'「立派って言っていいのか、これ。」'},
    {speakerKey:'natsu', text:'「まだ入れないよ。最後に一個残ってる。」'},
    {speakerKey:'minato', text:'「ここまで来たなら、先にそっちを片づけよう。」'}
  ],

  badEnd: [
    {speakerKey:'natsu', text:'「……あんこく。」'},
    {speakerKey:'minato', text:'「妙に納得しそうになるのが嫌だな。」'},
    {speakerKey:'haru', text:'「でも、変なものが出ること自体は闇鍋として間違ってないよね。」'},
    {speakerKey:'player', text:'「……待って。きゅうり、入ってる。」'},
    {speakerKey:'minato', text:'「あ。」'},
    {speakerKey:'natsu', text:'「……それは、まずい。」'},
    {speakerKey:'haru', text:'「高校のときのこと、まだ無理？」'},
    {speakerKey:'system', text:'高校時代のある出来事をきっかけに、{{player}}はきゅうりだけはどうしても口にできなくなった。アレルギーではない。それでも、無理に食べれば済む話ではない。'},
    {speakerKey:'player', text:'「自分だけ別のもの食べればいいよ。せっかくここまで決まったし。」'},
    {speakerKey:'haru', text:'「今日は、それじゃ嫌だな。」'},
    {speakerKey:'player', text:'「誕生日の人が言う？」'},
    {speakerKey:'haru', text:'「誕生日だから言う。せっかく4人いるんだから、4人で同じ鍋を食べたい。」'},
    {speakerKey:'minato', text:'「まだ何も入れてない。なら、決まったものを一度見直す余地はある。」'},
    {speakerKey:'natsu', text:'「きゅうり一個だけでも変えられたら勝ち。やれること探そう。」'}
  ],

  afterTurn: [
    {speakerKey:'player', text:'「この図……カードを、皿の上で回すってことか。」'},
    {speakerKey:'minato', text:'「たぶん。少なくとも、図の向きはそう見える。」'},
    {speakerKey:'haru', text:'「実物で確かめよう。」'},
    {speakerKey:'natsu', text:'「こういうときだけ急に静かになるの、ちょっと怖いな。」'},
    {speakerKey:'minato', text:'「お前がうるさいだけ。」'}
  ],

  afterSecond4: [
    {speakerKey:'natsu', text:'「え、待って。きゅうりだけじゃない。」'},
    {speakerKey:'player', text:'「4つとも変わってる……。」'},
    {speakerKey:'minato', text:'「一枚の使い方を変えたら、周りまで連動したってことか。」'},
    {speakerKey:'haru', text:'「このカード、さっき4人で解いた3問にも使ったよね。」'},
    {speakerKey:'natsu', text:'「……そっちも？」'},
    {speakerKey:'minato', text:'「試す価値はある。」'}
  ],

  afterSecond7: [
    {speakerKey:'natsu', text:'「今度は、ちゃんと鍋の顔してる！」'},
    {speakerKey:'minato', text:'「大根、しいたけ、豚肉、人参、白菜、もつ、もやし。ようやく安心して火にかけられる。」'},
    {speakerKey:'haru', text:'「{{player}}も食べられる？」'},
    {speakerKey:'player', text:'「これなら大丈夫。」'},
    {speakerKey:'natsu', text:'「じゃあ、あと一個だけ。」'},
    {speakerKey:'minato', text:'「最後まで確認してから鍋に入れる。今日はそれを学んだ。」'}
  ],

  clear: [
    {speakerKey:'natsu', text:'「……だんけつ。」'},
    {speakerKey:'haru', text:'「なんか、今のテーブルそのままみたい。」'},
    {speakerKey:'minato', text:'「よし。今度こそ作るぞ。肉とモツはちゃんと火を通す。」'},
    {speakerKey:'natsu', text:'「最後だけ急に生活指導。」'},
    {speakerKey:'player', text:'「でも、そこは大事。」'},
    {speakerKey:'system', text:'湯気が上がる。誰かが具材を足し、誰かが器を差し出し、誰かが話の続きを始める。'},
    {speakerKey:'haru', text:'「今年の誕生日、これでよかったかも。」'},
    {speakerKey:'natsu', text:'「“かも”？」'},
    {speakerKey:'haru', text:'「かなり。」'},
    {speakerKey:'minato', text:'「次は普通の鍋にしよう。」'},
    {speakerKey:'natsu', text:'「それ、次も集まる前提で言ってる？」'},
    {speakerKey:'player', text:'「じゃあ、次の日程は鍋食べながら決めよう。」'},
    {speakerKey:'system', text:'学生の頃みたいに、いつでも集まれるわけじゃない。それでも、同じ鍋を囲む時間は、また作れる。'}
  ]
};
