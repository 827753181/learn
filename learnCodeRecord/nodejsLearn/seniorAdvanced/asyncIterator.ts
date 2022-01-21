const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();
  const ite = on(ee, 'foo');

  process.nextTick(async () => {
    ee.emit('foo', 'Hello');
    // ee.emit('error', new Error('unknown mistake.'))
    ee.emit('foo', 'Node.js');
    // await sleep(200)
  });

  try {
    for await (const event of ite) {
      console.log(event); // prints ['Hello']
    }
  } catch (err) {
    console.log(err.message); // unknown mistake.
  }
})();