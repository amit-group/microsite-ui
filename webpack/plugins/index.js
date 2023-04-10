const manifest = require('../manifest');
const plugins = [];
plugins.push(
    // require('./dotenv'),
    require('./cleanWebpackPlugin'),
    require('./miniCssExtractPlugin'),
    // ...(require('./htmlPlugin')),
    require('jquery')
);
module.exports = plugins;