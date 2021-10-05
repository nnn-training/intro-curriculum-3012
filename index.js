'use strict';
const http = require('http');

const now = new Date();
 
     let itu = {
       Month:now.getMonth()+1,
       Day:now.getDate(),
       Year:now.getFullYear(),
       Week:["日","月","火","水","木","金","土"][(now.getDay())],
       Hours:now.getHours(),
       Minutes:now.getMinutes(),
       Seconds:now.getSeconds()
     }
 
     let logData = `${itu.Year}/${itu.Month}/${itu.Day}/(${itu.Week})${itu.Hours}:${itu.Minutes}:${itu.Seconds} `;

const server = http.createServer((req, res) => {
  //serverオブジェクトを作ったcreateServer関数
  console.info(//console.logと同じではあるが、残すタイプconsole.info関数
    `♪[ ${logData} ] ${req.socket.remoteAddress} からのアクセスありました。♪` //日時は見やすいように[]で囲んでいる
  );                          //IPアドレス
  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.write(req.headers['user-agent']);
  res.end();      //onの引数はイベント名 //特に何をするというわけではなく、ログを出している
})                //Node.jsサーバーは常に動いていて、何かイベントがあったらそれに対応した処理をする
                  //userのアクセスがあったらuserにデータを返す　　ここではエラーが発生したら検知する
.on('error', e => {//.onで、イベント検知がついている   //ここはサーバー側のエラー  //e はerrorイベントの引数
                   //エラーオブジェクトに出力  //ここでエラーイベントの定義が無いとしたら、無視するのがデフォルト
  console.error(`!サーバーエラー[ ${logData} ] \n`, e);//,で区切ればログを続けて出せる
})                                             //↑ e はエラーオブジェクトの内容
.on('clientError' , e => {//クライアント側のエラー
                          //エラーの内容はエラーオブジェクト内に
  console.error(`!!クライアントエラー[ ${logData} ] \n`, e);
});
const port = 8000;
server.listen(port, () => {
  //console.log('Listening on ' + port);
  console.info(`※ [ ${logData} ] ${port}番ポート ※`);
  //起動した日時がログとして残せる
});

//起動するコマンド
//node index.js

//標準出力もエラー出力も両方
//出力も、ファイル書き込みもする
//node index.js 2>&1 | tee -a application.log

//