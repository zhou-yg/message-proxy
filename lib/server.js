const Server = require('net').Server;
const http = require('http');
const PORT = process.env.PORT || 10001;
const SERVER_NAME = process.env.SNAME || 'server';

var clients = [];

const httpServer = http.createServer(function (req, res) {

  clients.forEach(function (socket) {
    socket.write(req.url);
  })

  res.end();
});

const s = new Server(function (conn) {
  var isFirst = true;
  var connName = '';

  var log = function (str, arg) {
    console.log.apply(console, [`"${connName}" ${str}`, arg])
  };

  conn.on('end', function () {
    log(`connection is disconnected`);
  });

  conn.on('data', function (d) {
    if (isFirst) {
      connName = d;
      isFirst = false;
    }
    log(`is connected`);
  });

  conn.on('end', function () {
    log(`server end`);
    clients = clients.filter(c => c !== conn);
  });

  conn.write(SERVER_NAME);

  clients.push(conn);
});

s.listen(PORT, function () {
  console.log(`socket listen on:${PORT}`);
});

httpServer.listen(PORT-1, function () {
  console.log(`http listen on:${PORT-1}`);
});
