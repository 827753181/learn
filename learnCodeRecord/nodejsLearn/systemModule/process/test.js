//master.js
const fork = require('child_process').fork;
const cpus = require('os').cpus();
process.title = 'node-master'

for (let i=0; i<cpus.length; i++) {
    const worker = fork('test2.js');
}



process.exit();