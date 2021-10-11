'use strict';
const http = require('http');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const youbi = date.getDay();
const week = ['日','月','火', '水','木','金','土'];
const dateInfo = `${year}年${month}月${day}日${week[youbi]}曜日`;

const server = http
  .createServer((req, res) => {
    console.info(
      '[' + dateInfo + '] Requested by ' + req.socket.remoteAddress
    );
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.write(req.headers['user-agent']);
    res.end();
  })
  .on('error', e => {
    console.error('[' + dateInfo + '] Server Error', e);
  })
  .on('clientError', e => {
    console.error('[' + dateInfo + '] Client Error', e);
  });
const port = 8000;
server.listen(port, () => {
  console.info('[' + dateInfo + '] Listening on ' + port);
});