// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  alias: {
    '@': './src',
  },
  routes: [
    {
      path: '/weapp',
      routes: [{ path: '/weapp/rollDice', component: '../pages/weapp/rollDice/index' }],
    },
    {
      path: '/',
      component: '../layouts/baseLayOut/index',
      routes: [
        { path: '/', component: '../pages/backConfigPage/index' },
        { path: '/weapp/rollDice', component: '../pages/weapp/rollDice/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'umiVersion',
        dll: true,
        locale: {
          enable: true,
          default: 'en-US',
        },
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  chainWebpack(config, arg) {
    /*  config.module
          .rule('self')
          .test(/\.(js|mjs|jsx|ts|tsx)$/)
          .pre()
          .include
            .add(/src/)
            .end()
          .use('selfLoader')
            .loader('./loader/addReactLoader') */
  },
};
