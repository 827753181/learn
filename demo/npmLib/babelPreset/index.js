// mypreset.js
// 这种格式发布后就是presets

// plugins 与 presets 的执行顺序
// 可以同时使用多个 Plugin 和 Preset，此时，它们的执行顺序非常重要。
// 
// 先执行完所有 Plugin，再执行 Preset。
// 多个 Plugin，按照声明次序顺序执行。
// 多个 Preset，按照声明次序逆序执行。
// 比如 .babelrc配置如下，那么执行的顺序为：
// 
// Plugin：transform-react-jsx、transform-async-to-generator
// Preset：es2016、es2015
module.exports = {
  "plugins": [ 
    "transform-react-jsx",
    "transform-async-to-generator"
  ],
  "presets": [ 
    "es2015",
    "es2016"    
  ]
};


//然后，修改.babelrc。本地文件用相对路径，如果发布到了npm上，就可以直接用包名。
// {
//   "presets": [
//     "./mypreset.js"
//   ]
// }