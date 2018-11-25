const Socket = require('net').Socket;
const socket = new Socket();

var connected = false;

socket.on('data', function (d) {
  const cmd = d.toString().split('/').filter(_ => _);
  if (cmd.length > 1) {
    socket.emit('cmd', cmd[0], cmd.slice(1), cmd);
  }
});
socket.on('end', function () {
});
socket.on('error', function (e) {
  console.log(e);
});

module.exports = socket;

module.exports.config = function (port, host, name) {
  console.log(connected);
  if (!connected) {
    socket.connect(port, host, function () {
      connected = true;

      console.log(`connected`, name);

      socket.write(name);
    });
  }
  return socket;
}
