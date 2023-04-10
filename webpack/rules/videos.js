// --------------
// @Rules Videos
// --------------

module.exports = {
    test: /\.(mp4|mov)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            limit: '8000',
            outputPath: 'videos/',
            publicPath: 'videos/',
            esModule: false
        }
    }]
 };