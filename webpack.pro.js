const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    entry: './src/page/test/main.js',
    output: {
        filename: '[contenthash].bundle.js',
        chunkFilename: '[contenthash].bundle.js',
    },
    plugins: [new CleanWebpackPlugin()],
});
