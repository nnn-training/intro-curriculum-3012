'use strict';
const http = require('http');

function now() {
  const today = new Date();
  const year = today.getFullYear(); // 年を取得(2021年)
  const month = today.getMonth() + 1; // 月は0から数えてしまうので1を足す
  const day = today.getDate(); // 日にちを取得
  const dayofweek = today.getDay(); // 曜日を取得(0~6で 0は日曜日、6は土曜日)
  const dayname = ['日', '月', '火', '水', '木', '金', '土']; // 曜日は番号で取得するので配列が必要
  const result = (`${year}年${month}月${day}日(${dayname[dayofweek]})`);

  return result;
}


const server = http
  .createServer((req, res) => {
    console.info(
      `[${now()}] Requested by ${req.socket.remoteAddress}`
    );
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.write(req.headers['user-agent']);
    res.end();
  })
  .on('error', e => {
    console.error(`[${now()}] Server Error', ${e}`);
  })
  .on('clientError', e => {
    console.error(`[${now()}] Client Error', ${e}`);
  });
const port = 8000;
server.listen(port, () => {
  console.info(`[${now()}] Listening on ${port}`);
});