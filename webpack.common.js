const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/page-web/', // html引用的资源的路径前缀
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false, // 禁用es模块被转化
                    },
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            threadMode: true,
                            esModule: true,
                            cssSourceMap: false,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'happypack/loader?id=scss'],
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'happypack/loader?id=sass'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!client-container)/,
                use: ['happypack/loader?id=babel'],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/view/index.html',
            logoPath: './assets/image/logo.png',
        }),
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, `./src/assets`), to: path.resolve(__dirname, `./dist/assets`) }],
        }),
        new DllReferencePlugin({
            // 描述 vue 动态链接库的文件内容
            manifest: require('./dist_dll/vue.manifest.json'),
        }),
        new DllReferencePlugin({
            // 描述 vendor 动态链接库的文件内容
            manifest: require('./dist_dll/rendor.manifest.json'),
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: './dist_dll/*.dll.js', //将生成的dll文件加入到index.html中
            },
        ]),
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        chrome: '60',
                                    },
                                    useBuiltIns: 'usage',
                                    corejs: 2,
                                    modules: false,
                                },
                            ],
                        ],
                        plugins: [
                            '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                        ],
                        sourceType: 'unambiguous',
                    },
                },
            ],
        }),
        new HappyPack({
            id: 'scss',
            loaders: ['sass-loader'],
        }),
        new HappyPack({
            id: 'sass',
            loaders: ['sass-loader?indentedSyntax'],
        }),
    ],
    stats: {
        warnings: false,
        // assets: false,
        modules: false,
        // entrypoints: false,
    },
    resolve: {
        extensions: ['.vue', '.js'],
        alias: {
            // vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
            utils: path.resolve(__dirname, 'src/utils'),
            theme: path.resolve(__dirname, 'src/theme'),
            component: path.resolve(__dirname, 'src/component'),
        },
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                cache: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
            new CssMinimizerPlugin({
                cache: true,
                parallel: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
};
