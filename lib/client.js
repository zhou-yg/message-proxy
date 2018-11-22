const Socket = require('net').Socket;
const socket = new Socket();

let connected = false;

socket.on('data', d => {
  const cmd = d.toString().split('/').filter(_ => _);
  if (cmd.length > 1) {
    socket.emit('cmd', cmd[0], cmd.slice(1), cmd);
  }
});
socket.on('end', () => {
});
socket.on('error', (e) => {
  console.log(e);
});

module.exports = socket;

module.exports.config = function (port, host, name) {
  if (!connected) {
    socket.connect(port, host, () => {
      connected = true;

      socket.write(name);
    });
  }
  return socket;
}
