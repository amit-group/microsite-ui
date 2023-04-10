const path = require("path");

module.exports = {
  jQuery: path.join(__dirname, "node_modules") + "/jquery/dist/jquery",
  "@core": path.join(__dirname, "src/core"),
  "@microsite": path.join(__dirname, "src/microsite"),
};
