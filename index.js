'use strict';
const http = require('node:http');

const server = http
  .createServer((req, res) => {

    console.info(`[${new Date()}] Requested by ${req.socket.remoteAddress}`);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8' });

    res.write(req.headers['user-agent']);
    res.end();
  })
  .on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);})//e = エラーオブジェクト

  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);});

//機能はconsole.log()と同じ 色が変わるくらい

//info ：意図的にしてる（消すな）　
//log：  デバッグのため（あとで消す） 
//error：やばい 


server.listen(8000, () => {
  console.info(`[${new Date()}] に、サーバ起動！`);
  console.error('うわああああああああああああああ');
});
