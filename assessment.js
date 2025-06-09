//厳格モード: エラーとして表示
'use strict';

/*【厳格モードでの動き方MEMO】

１. let変数について
let aaa = 100;
// bbb = 1; letなしで宣言不可能×
console.log(aaa);
console.log(bbb);


２. const定数について
const a = 1; //上書き不可×
if(a === 1){
  const b = 2; //ifブロックを抜けると無効×
}

３. var変数について
function var_behavior(){
  var k = 4;
  if(k === 4){
    var k = 5; //varは同じ変数名を使って再宣言可能◎
    var m = 6; //ブロック外も有効◎
  }
  console.log(k);
  console.log(m);
}
var_behavior();
*/



//【文字列の文字コード(割り当てられてる数値)を足して結果を出力】

 //＜###userName###は引数userName（入力値）に置き換えられる＞
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

//＜これだけだとデベロッパーツールconsole内での指定された実行しかできない＞
function assessment(userName){
  let sumOfCharCode = 0;
  for(let i=0; i<userName.length; i++){
    sumOfCharCode += userName.charCodeAt(i);
  }
  const index = sumOfCharCode % answers.length; //answersは関数外で定義済。answers.lengthは要素数
  let result = answers[index];
  result = result.replaceAll('###userName###', userName); //入力値を反映
  return result;
}
console.log(assessment('太郎')); //デベロッパーツールconsoleで出力


//＜ボタンクリック時にWebサイト上に結果出力＞
//グロ―バル変数の定義
const userNameInput = document.getElementById('user-name'); //🌸入力値を受け取る
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

//イベント発生時に呼び出す関数
assessmentButton.addEventListener(
  //イベント指定
  'click',

  //アロー関数
  event => { 

    //⚠最初に処理。入力欄resultDivisionに子要素firstChildがあれば削除し続ける
    if(resultDivision != null){
        while(resultDivision.firstChild){
          resultDivision.removeChild(resultDivision.firstChild);
      }
    }/*もしくは、超簡易版↓
    if (resultDivision) {
      resultDivision.innerHTML = '';
    }*/

    const userName = userNameInput.value; //🌸わかりやすいように変数に代入
    if(userName.length === 0){
      alert('ユーザー名を入力してください。');
      return;
    }

    //診断結果表示
    //headerDivision の作成
    const headerDivision = document.createElement('div'); //ヘッダータグを作り
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果'; //出力

    //bodyDivision の作成
    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p'); //pタグを作り
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result; //出力
    bodyDivision.appendChild(paragraph); //pタグをHTMLのdiv「bodyDivision」に追加

    //resultDivision に Bootstrap のスタイルを適用する
    resultDivision.setAttribute('class', 'card');

    //headerDivision と bodyDivision を resultDivision に差し込む
    resultDivision.appendChild(headerDivision); //h3相当をHTMLのdiv「result-area」に追加
    resultDivision.appendChild(bodyDivision); //pタグを含むbodyを追加

    //ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a'); //aタグを作成
    //HTMLでURL貼り付けない場合のJSでの書き方 
    const hrefValue = 'https://x.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw'; //encodeとは、文字をPCが理解できる文字列に変換すること
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivision.appendChild(anchor); //aタグをdiv「tweet-area」に追加

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
  }
);


//＜デベロッパーツールconsoleで値の不一致がないか監査＞
function test(){
  console.log('診断結果の文章テスト');

  console.log('太郎');
  console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '第1引数(上の文章)がfalseです。'
  );

  console.log('次郎');
  console.assert(
    assessment('次郎') ===
    '次郎のいいところは厳しさです。次郎の厳しさがものごとをいつも成功に導きます。', //第1引数
    '第1引数(上の文章)がfalseです。' //第2引数
  );

  console.log('三郎');
  console.assert(
    assessment('三郎') ===
    '太郎の長所はのいいところは感受性です。三郎が感じたことに皆が共感し、わかりあうことができます。', //第1引数
    '第1引数(上の文章)がfalseです。' //userNameが一致していないか、answerのフレーズと一致していないと、第1引数がエラーになり、この第2引数が出力される
  );

  console.log('診断結果の文章のテスト終了');
}
test();
