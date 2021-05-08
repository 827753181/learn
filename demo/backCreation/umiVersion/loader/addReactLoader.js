/**
 * source为原文件的字符串格式
 */
module.exports = function(source, map) {
  //对source进行解析
  console.log(source);
  return "var React = require(react);\n" +"module.exports=)"+source;
};
