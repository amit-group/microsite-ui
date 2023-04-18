// --------------
// @Rules Images
// --------------
module.exports = {
    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192,
            esModule: false
        }
    }]
 };