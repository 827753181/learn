module.exports = {
  presets: [
    [
      "@babel/env",
      {
        modules: false,
        useBuiltIns: "usage",
        targets: {
          browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
        },
        corejs: { version: "3.8", proposals: true },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-transform-runtime",
  ],
};
