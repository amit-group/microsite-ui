module.exports = {
  test: /\.tsx?$/,
  loader: "ts-loader",
  options: { configFile: "tsconfig.app.json" },
  exclude: /node_modules/,
};
