// 変数 =(代入) 値
// ここでタグをロードしてるよ！！
const titleText = document.getElementById('title');
const questionText = document.getElementById('question');
const comboText = document.getElementById('combo');
const timeText = document.getElementById('time');
const ptsText = document.getElementById('pts');
const plusText = document.getElementById('point_th');
// const question = 0;
// const ans = 1;

// 正解
const correctAudio = new Audio();
correctAudio.src = 'sounds/correct2.mp3';

// 不正解
const incorrectAudio = new Audio();
incorrectAudio.src = 'sounds/incorrect1.mp3';

// good
const goodAudio = new Audio();
goodAudio.src = 'sounds/info-girl1_info-girl1-good1.mp3';

// exellent
const excelAudio = new Audio();
excelAudio.src = 'sounds/info-girl1_info-girl1-excellent1.mp3';

// marvelous
const marvAudio = new Audio();
marvAudio.src = 'sounds/info-girl1_info-girl1-marvelous1.mp3';

// すごい！
const sugoiAudio = new Audio();
sugoiAudio.src = 'sounds/sugoi.mp3';

// Timeup
const timeAudio = new Audio();
timeAudio.src = 'sounds/info-girl1_info-girl1-timeup2.mp3';

// 変更するところは`let`, 変更しないところは`const`
let sum;
let correctAnswer;
let pts, time, combo, pcnt, plusPts;
let dt2, endDt2;

// × = 0, ○ = 1
// レベル(余裕：1, かんたん：2, 普通：3, なかなか：4, 難しい？：5)
const questions = [{
    question: '夏の大三角の1等星はデネブ、アルタイル、ベガである。○か×か。',
    answer: 1, // O
    lebel: 2
}, {
    question: '2000円札は、既に製造が停止されている。○か×か',
    answer: 1, // O
    lebel: 5
}, {
    question: '日本の中で、面積が一番小さい都道府県は、大阪府である。○か×か。',
    answer: 0, // X
    lebel: 3
}, {
    question: 'アイスには賞味期限がなく、きちんと保管されたものであれば、昔のものでも食べられるか。○か×か。',
    answer: 1, // O
    lebel: 4
}, {
    question: '干支は12種類の動物から成り立っている。○か×か。',
    answer: 1, // O
    lebel: 1
}, {
    question: '明治から発売されている人気のお菓子、「きのこの山」、「たけのこの里」で、人気があるのは、「きのこの山」の方である。○か×か。',
    answer: 0, // X
    lebel: 2
}, {
    question: ' タラバガニはカニではない。○か×か。',
    answer: 1, // O
    lebel: 4
}, {
    question: ' 1円玉の直径は1センチメートルである。○か×か。',
    answer: 0, // X
    lebel: 2
}, {
    question: ' 相撲の土俵は、発祥当時から、丸形であった。○か×か。',
    answer: 0, // X
    lebel: 4
}, {
    question: ' 大人気映画「ゴジラ」の名前は、ある東映社員の容姿から発想を得て出来ている。○か×か。',
    answer: 1, // O
    lebel: 3
}, {
    question: '卓球のラケットには、サイズの規定はなく、超巨大なラケットもルール上容認されている。○か×か。',
    answer: 1, // O
    lebel: 3
}, {
    question: 'キリンの睡眠時間は1時間である。○か×か。',
    answer: 0, // X
    lebel: 4
}, {
    question: '交通事故の発生件数が一番多い都道府県は、東京都である。○か×か。',
    answer: 0, // X
    lebel: 3
}, {
    question: '蝶（チョウ）と蛾（ガ）は、生物学的に、別の種類に分類されている。○か×か。',
    answer: 0, // X
    lebel: 3
}, {
    question: '地球上で一番素早く動ける動物はチーターである。○か×か。',
    answer: 0, // X
    lebel: 3
}, {
    question: 'パソコン操作に用いるマウスについて。マウスを動かした際の「単位」には、センチではなく、「ミッキー」という単位が用いられる。○か×か。',
    answer: 1, // O
    lebel: 5
}, {
    question: '仮想通貨のビットコインで初めて決済され、購入された商品はピザである。○か×か。',
    answer: 1, // O
    lebel: 5
}, {
    question: '株式会社を設立する際の資本金は0円でも可能である。○か×か。',
    answer: 0, // X
    lebel: 5
}, {
    question: '「挨拶（あいさつ）」という漢字は、中国語では「拷問（ごうもん）」を意味する。○か×か。',
    answer: 1, // O
    lebel: 5
}, {
    question: 'シュークリームの「シュー」の名前の由来は、フランス語の「焼く」という言葉が語源である。○か×か。',
    answer: 0, // X
    lebel: 5
}, {
    question: '高速道路でゆっくり走るとスピード違反になる。○か×か。',
    answer: 1, // O
    lebel: 3
}, {
    question: '猫は汗をかかない。○か×か。',
    answer: 0, // X
    lebel: 2
}];

let probLeng = questions.length;

let num;

function writeQuestion() {
    titleText.textContent = `第${sum + 1}問`;

    num = Math.floor(Math.random() * probLeng);
    questionText.textContent = questions[num].question;

    // questionText.textContent = questions[sum].question;
    comboText.textContent = combo;
    ptsCountdown();
}

// 全体のカウントダウン
function countdown() {
    // カウントダウンする秒数
    var sec = 15;

    // 開始日時を設定
    var dt = new Date();
    console.log("Start: ", dt);
    // 終了時刻を開始日時+カウントダウンする秒数に設定
    var endDt = new Date(dt.getTime() + sec * 1000);
    console.log("End : ", endDt);

    // 1秒おきにカウントダウン
    var cnt = sec;
    id = setInterval(function() {
        cnt = cnt - 0.01;
        timeText.textContent = `${cnt.toFixed(2)}`
            // 現在日時と終了日時を比較
        dt = new Date();
        if (dt.getTime() >= endDt.getTime()) {
            clearInterval(id);
            // jsonWrite();
            timeAudio.play();
            alert(`終了!\n出題数：${sum}\n正解数：${correctAnswer}\n正答率：${((correctAnswer / sum) * 100).toFixed(2)}%\n最終コンボ数：${combo}\nスコア：${pts.toFixed(2)}`);
            clearInterval(id);
            onStart();
            // location.href = 'result.html';
        }
    }, 10);
}



// ポイント用のカウントダウン
function ptsCountdown() {
    // 1秒おきにカウントダウン
    pcnt = 5;
    id2 = setInterval(function() {
        pcnt = pcnt - 0.01;
    }, 10);
}

function stopPtsCnt() {
    clearInterval(id2);
}

// HTML側 <button onclick="answer(1)">○</button>
// 関数と引数 f(x) = 

// 上のhtmlだとansに1が入るよ！
function answer(ans) {
    stopPtsCnt();
    if (ans === questions[num].answer) {
        console.log('正解');
        correctAnswer++;
        combo++;
        correctAudio.play();

        if (pcnt > 3.5) {

            if ((Math.floor(Math.random() * 11)) > 5) {
                sugoiAudio.play();
            } else {
                marvAudio.play();
            }

        } else if (pcnt > 2.5) {
            excelAudio.play();
        } else if (pcnt > 1) {
            goodAudio.play();
        }

        ptsPlus();
    } else {
        incorrectAudio.play();
        console.log('不正解');
        combo = 0;
    }

    ptsText.textContent = `${pts.toFixed(2)}`

    sum++;

    writeQuestion();
    // if (sum === questions.length) {
    //     // 5問目に達したらsum = 4, length = 4なので終了！！
    //     // jsonWrite();
    //     // location.href = 'result.html';
    //     alert(`終了!\n出題数：${sum}\n正解数：${correctAnswer}\n最終コンボ数：${combo}\nスコア：${score}`);
    //     onStart();
    // } else {
    //     writeQuestion();
    // }
}

function ptsPlus() {
    if (pcnt >= 1) {
        console.log(pcnt);
        plusPts = pcnt * questions[num].lebel;
        console.log(`追加されるポイント：${plusPts}`);
        pts += questions[num].lebel * pcnt;
    } else {
        console.log(pcnt);
        plusPts = questions[num].lebel;
        console.log(`追加されるポイント：${plusPts}`);
        pts += questions[num].lebel;
    }
    plusText.textContent = `+${plusPts.toFixed(2)}`
}


function onStart() {

    sum = 0;
    correctAnswer = 0;
    pts = 0;
    combo = 0;
    pcnt = 0;
    ptsText.textContent = pts;
    plusText.textContent = `　`;

    // getProblem();
    writeQuestion();
    countdown();
}

onStart();