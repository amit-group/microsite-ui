// --------------
// @Rules Images
// --------------
module.exports = {
  test: /\.html$/,
  exclude: /index\.html$/,
  use: [
    {
      loader: "html-loader",
      options: {
        esModule: false,
      },
    },
  ],
};
