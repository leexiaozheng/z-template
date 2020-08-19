const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    entry: ['./src/page/test/mock.js', './src/page/test/main.js'],
    devtool: 'inline-source-map',
    devServer: {
        clientLogLevel: 'error',
        // contentBase: path.join(__dirname, './dist'),
        publicPath: '/page-web/', // 对应服务器根目录的url
        historyApiFallback: {
            index: '/page-web/index.html', // 重定向url
        },
        open: true, // 打开浏览器，加载页面
        openPage: 'page-web/home', // 加载页面的url
        hot: true,
        host: '0.0.0.0',
        useLocalIp: true, // 打开浏览器后用自己ip显示页面
        progress: true, // 显示进度
    },
});
