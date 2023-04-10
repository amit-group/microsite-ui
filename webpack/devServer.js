const path = require("path");

// -----------------
// @DevServer Config
// -----------------

const devServer = {
  open: false,
  static: {
    directory: path.resolve(__dirname, "../src"),
  },
  watchFiles: ["../src/**/*"],
  liveReload: true,
  port: process.env.PORT || 3000,
};

// -----------------
// @Exporting Module
// -----------------

module.exports = devServer;
