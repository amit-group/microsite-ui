const path = require("path"),
  manifest = require("../manifest"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = {
  index: "index.html",
};

module.exports = Object.keys(pages).map((filename) => {
  const page = pages[filename];
  return new HtmlWebpackPlugin({
    template: path.join(manifest.paths.input, `${filename}.html`),
    path: manifest.paths.output,
    filename: `${filename}.html`,
    inject: true,
    hash: true,
    minify: {
      collapseWhitespace: manifest.IS_PRODUCTION,
      minifyCSS: manifest.IS_PRODUCTION,
      minifyJS: manifest.IS_PRODUCTION,
      removeComments: manifest.IS_PRODUCTION,
      useShortDoctype: manifest.IS_PRODUCTION,
    },
    meta: {
      viewport: `width=device-width,initial-scale=1`,
    },
  });
});
