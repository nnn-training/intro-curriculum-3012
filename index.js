'use strict';
// コンソールからnode index.jsで起動
// 127.0.0.1以外（自分自身ではないIPアドレス）が表示されるのは、
// コンテナのOSにホストOSのとは別のIPアドレスが割り振られるから
// →tmuxで別窓からcurl http://localhost:8000/を実行したときのログを見てみると
// ホストOSからのリクエストになる
const http = require('http');
const server = http
  .createServer((req, res) => {
    console.info(
      '[' + new Date() + '] Requested by ' + req.socket.remoteAddress
    );
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.write(req.headers['user-agent']);
    res.end();
  })
  // サーバーエラーとクライアントエラーをエラーログに出力するため
  // ファイルにもエラーログを出力したいときには、ファイル記述子を使った次をtmuxから2つの窓で実行
  // node index.js 2>&1 | tee -a application.log
  // （標準エラー出力を標準出力にリダイレクトさせる。標準エラー出力はデフォルトでは
  // ターミナルに受け渡されるので、エラーの表示自体はされるが application.log には保存されない）
  .on('error', e => {
    console.error('[' + new Date() + '] Server Error', e);
  })
  .on('clientError', e => {
    console.error('[' + new Date() + '] Client Error', e);
  });
const port = 8000;
server.listen(port, () => {
  console.info('Listening on ' + port + new Date());
});