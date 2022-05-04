// const http = require('http')
// const q = require('./query')

// const hostname = '127.0.0.1'
// const port = 4000

// const server = http.createServer(async (req, res) => {
//   console.log('req', req.url)
//   // console.log('res', res)
//   console.log('q', q)
//   const d = await q.queryData({})
//   console.log('d', d)

//   const data = { data: d, code: 200 }
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'application/json')
//   res.end(JSON.stringify(data))
// })

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })

const http = require('http');

const hostname = 'zonghuang.cn';
const port = 9998;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
