// --------------
// @use Config
// --------------
// require('dotenv').config({
//   path: require('./webpack/manifest').IS_PRODUCTION ? './.env.prod' : './.env'
// });
const config = require('./webpack/config');



module.exports = config;