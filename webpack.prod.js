// let merge = require('webpack-merge');
// let config = require('./webpack.config.js');
// let CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let glob = require('glob-all');
let PurifyCSSPlugin = require('purifycss-webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

let SRC_DIR = path.resolve(__dirname,'src');
let DIST_DIR = path.resolve(__dirname, 'dist');
let ASSET_PATH = process.env.ASSET_PATH || '';

let conf = {
    entry: {
        app: SRC_DIR + '/app.js',
        // contact: './src/contact.js',
    },
    output: {
        path: DIST_DIR,
        filename: '[name].bundle.js',
        publicPath: ASSET_PATH
    },
    resolve: {
        modules: [SRC_DIR, "node_modules"],
        extensions: ['.js', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jade$/,
                use: 'jade-loader'
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: false
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // exclude: '/node_modules/'
            },
            {   test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    // publicPath: '../'
                })
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    // publicPath: '../'
                })
            },
            // {
            //     test: /\.styl$/,
            //     use: [
            //         { loader: 'style-loader', options: { sourceMap: true } },
            //         { loader: 'css-loader', options: { sourceMap: true } },
            //         { loader: 'postcss-loader', options: { sourceMap: true } },
            //         { loader: 'stylus-loader', options: { sourceMap: true } },
            //     ]
            // },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','postcss-loader','stylus-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    // 'file-loader?name=[name].[ext]&outputPath=../images/&publicPath=.images/',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(svg)$/,
                use: 'file-loader?name=images/icons/[name].[ext]'
            },
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     use: [
            //         'file-loader?name=images/[name].[ext]',
            //         {
            //             loader: 'image-webpack-loader',
            //             options: {
            //                 mozjpeg: {
            //                     progressive: true,
            //                     quality: 85
            //                 },
            //                 // optipng.enabled: false will disable optipng
            //                 optipng: {
            //                     enabled: false,
            //                 },
            //                 pngquant: {
            //                     quality: '90',
            //                     speed: 4
            //                 },
            //                 gifsicle: {
            //                     interlaced: false,
            //                 },
            //                 // the webp option will enable WEBP
            //                 webp: {
            //                     quality: 75
            //                 }
            //             }
            //         },
            //     ],
            // },
            {
                test: /\.(woff2?|ttf|eot|otf)$/,
                use: 'file-loader?name=fonts/[name].[ext]'
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Index',
            template: './src/pug/pages/index.pug',
            hash: true,
            // excludeChunks: ['contact'],
            // minify: {
            //     collapseWhitespace: true
            // },
        }),

        // new HtmlWebpackPlugin({
        //     title: 'Photo',
        //     template: './src/pug/pages/photo.pug',
        //     hash: true,
        //     filename: 'photo.html',
        //     // chunks: ['contact'],
        //     // minify: {
        //     //     collapseWhitespace: true },
        // }),
        //
        // new HtmlWebpackPlugin({
        //     title: 'Form',
        //     template: './src/pug/pages/form.pug',
        //     hash: true,
        //     // chunks: ['contact'],
        //     filename: 'form.html',
        // }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new ExtractTextPlugin({
            filename: 'css/styles.css',
            disable: false,
            allChunks: true
        }),

        new PurifyCSSPlugin({
            // paths: glob.sync(path.join(__dirname, 'src/*.pug')),
            paths: glob.sync([
                path.join(__dirname, 'src/pug/**/*.pug'),
                // path.join(__dirname, 'src/pug/modules/*.pug'),
                // path.join(__dirname, 'src/pug/pages/*.pug'),
                path.join(__dirname, 'src/assets/js/*.js')
            ]),
            purifyOptions: { info: true, minify: true }
        }),
    ],
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production
        ? 'false'
        : 'evel-sourcemap';

    return conf;
};