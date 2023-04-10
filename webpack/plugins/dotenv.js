const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = new Dotenv(
  {
    path: require('../manifest').IS_PRODUCTION ? path.resolve(__dirname, '../../.env.prod') : path.resolve(__dirname, '../../.env')
  }
);