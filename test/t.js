require('../lib/server');

s = require('../lib/client');

const evt = s.config(10001, 'localhost', 'testConnected');

s.on('cmd', (cmd, a) => {
  console.log(cmd, a);
});
