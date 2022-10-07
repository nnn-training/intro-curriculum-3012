'use strict';
const http = require('http');
const server = http
  .createServer((req, res) => {
    console.info(
      `[${new Date()}] Requested by ${req.socket.remoteAddress}`
    );
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8'
    });
    res.write(req.headers['user-agent']);
    res.end();
  })
  .on('error', e => {
    console.error(`[${dateDisplay()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${dateDisplay()}] Client Error`, e);
  });
const port = 8000;
server.listen(port, () => {
  console.info(`[${dateDisplay()}] Listening on ${port}`);
});

const dateDisplay = () => {
  const newDate = new Date();
  const dates = ['日', '月', '火', '水', '木', '金', '土'];
  return `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}(${dates[newDate.getDay()]}) ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
}