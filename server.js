const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const types = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const f = path.join(__dirname, path.normalize(p).replace(/^(\.\.[\/\\])+/, ''));
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': types[path.extname(f)] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(PORT, HOST, () => console.log(`Running on ${HOST}:${PORT}`));
