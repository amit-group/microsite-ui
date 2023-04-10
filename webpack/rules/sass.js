// --------------
// @Rules SASS
// --------------
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    test: /\.(scss|sass|css)/,
    use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '',
            },
        },
        {
            loader: 'css-loader',
            options: {
                esModule: false
            }
        },
        {
            loader: 'sass-loader'
        }
    ]
};