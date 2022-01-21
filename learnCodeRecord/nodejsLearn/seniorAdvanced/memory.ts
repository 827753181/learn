const format = function (num) {
  return `${(num / 1024 / 1024).toFixed(2)} MB`;
};

function print() {
  const mem = process.memoryUsage();
  let obj = {
    rss: mem.rss,
    heapTotal: mem.heapTotal,
    heapUsed: mem.heapUsed,
    external: mem.external,
  };
  for (let key in obj) {
    obj[key] = format(obj[key]);
  }
  console.log(JSON.stringify(obj));
}

var theThing = null;
// The Meteor Case-Study case 目前已经不会再泄漏
// var replaceThing = function () {
//   var originalThing = theThing;
//   var unused = function () {
//     if (originalThing) console.log("hi");
//   };
//   theThing = {
//     longStr: new Array(1000000).join("*"),
//     someMethod: function () {
//       console.log("ssss");
//     },
//   };
//   print();
// };
// setInterval(replaceThing, 1000);
