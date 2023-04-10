// --------------
// @Rules PDF
// --------------

module.exports = {
  test: /\.(doc|docx|pdf)$/,
  use: [{
      loader: 'file-loader',
      options: {
          name: '[name].[ext]',
          limit: '8000',
          outputPath: 'download/',
          publicPath: 'download/',
          esModule: false
      }
  }]
};