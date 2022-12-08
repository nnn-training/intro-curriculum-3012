'use strict';
const http = require('http');
const server = http
  .createServer((req, res) => {
    //情報ログ
    console.info(
      `[${new Date()}] Requested by ${req.socket.remoteAddress}`
    );
    //レスポンス
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.write(req.headers['user-agent']);
    res.end();
  })
  .on('error', e => { //例外エラーを取得時、エラーログ表示
    console.error(`[${new Date()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });
const port = 8000;
server.listen(port, () => {
  console.log(`[${new Date()}]Listening on ${port}`);
});
