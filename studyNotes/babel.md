* [整体流程](#runtime)
* [执行顺序](#run-accord)
* [常用 presets](#useful-presets)


# <a id="runtime"></a>整体流程

Babel 整个编译过程简单来说就是解析（parse），转换（transform），生成（generate）。

@babel/cli 负责解析 babel 的命令，根据命令行中的参数做一些非核心的工作。
@babel/core 负责串起整个编译流程，包括生成配置，读取文件，解析为 AST，AST 转换，AST 生成代码。
其中

> @babel/parser 提供默认的 parse 方法用于解析。  
> @babel/traverse 封装了对 AST 树的遍历和节点的增删改查操作。  
> @babel/generator 提供给默认的 generate 方法用于代码生成。

# <a id="run-accord"></a>执行顺序

plugins 与 presets 的执行顺序
先执行完所有 Plugin，再执行 Preset。
多个 Plugin，按照声明次序顺序执行。
多个 Preset，按照声明次序逆序执行。
比如 .babel.config.js 配置如下，那么执行的顺序为：

```ts
// Plugin：transform-react-jsx、transform-async-to-generator
// Preset：es2016、es2015
module.exports = {
  plugins: ["transform-react-jsx", "transform-async-to-generator"],
  presets: ["es2015", "es2016"],
};
```

# <a id="useful-presets"></a>常用 presets

常用 presets
react
@babel/preset-env，
@babel/preset-react，
@babel/preset-typescript

vue
@vue/babel-plugin-jsx，
@vue/cli-plugin-babel/preset
