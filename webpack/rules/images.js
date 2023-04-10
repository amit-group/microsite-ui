// --------------
// @Rules Images
// --------------
module.exports = {
    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
            limit: '8000',
            outputPath: 'images/',
            publicPath: 'images/',
            esModule: false
        }
    }]
 };