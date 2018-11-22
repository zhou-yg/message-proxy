const Server = require('net').Server;
const http = require('http');
const PORT = process.env.PORT || 10001;
const SERVER_NAME = process.env.SNAME || 'server';

let clients = [];

const httpServer = http.createServer((req, res) => {

  clients.forEach(socket => {
    socket.write(req.url);
  })

  res.end();
});

const s = new Server((conn) => {
  let isFirst = true;
  let connName = '';

  let log = (str, ...args) => console.log(...[`"${connName}" ${str}`, ...args]);

  conn.on('end', () => {
    log(`connection is disconnected`);
  });

  conn.on('data', (d) => {
    if (isFirst) {
      connName = d;
      isFirst = false;
    }
    log(`is connected`);
  });

  conn.on('end', () => {
    log(`server end`);
    clients = clients.filter(c => c !== conn);
  });

  conn.write(SERVER_NAME);

  clients.push(conn);
});

s.listen(PORT, () => {
  console.log(`socket listen on:${PORT}`);
});

httpServer.listen(PORT-1, () => {
  console.log(`http listen on:${PORT-1}`);
});
