// require('../lib/server');

s = require('../lib/client');

s.config(10002, 'localhost', 'testConnected');

s.on('cmd', (cmd, a) => {
  console.log(cmd, a);
});

s.write('hello')
