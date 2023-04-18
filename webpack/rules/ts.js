module.exports = {
  test: /\.tsx?$/,
  loader: "ts-loader",
  options: { configFile: "tsconfig.json" },
  exclude: /node_modules/,
};
