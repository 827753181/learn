const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

emitter.on("起床", function(time) {
    console.log(`早上 ${time} 开始起床，新的一天加油！`)
    //console.log(`关注公众号Nodejs技术栈，早上 ${time} 点开始起床阅读，从 Node.js 技术栈`);
});

emitter.emit("起床", "6:00");
const fs = require('fs');
const status = {};

const select = function(file, filename, cb) {
    emitter.once(file, cb);
    
    if (status[file] === undefined) {
        status[file] = 'ready'; // 不存在设置默认值
    }
    if (status[file] === 'ready') {
        status[file] = 'pending';
        fs.readFile(file, function(err, result) {
            console.log(filename);
            emitter.emit(file, err, result.toString());
            status[file] = 'ready';
            
            setTimeout(function() {
                delete status[file];
            }, 1000);
        });
    }
}

for (let i=1; i<=11; i++) {
    if (i % 2 === 0) {
        select(`./a.txt`, 'a 文件', function(err, result) {
            console.log('err: ', err, 'result: ', result);
        });
    } else {
        select(`./b.txt`, 'b 文件', function(err, result) {
            console.log('err: ', err, 'result: ', result);
        });
    }
}