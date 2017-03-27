'use strict';

const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

module.exports = {
    context: __dirname,
    entry: {
        components: ['babel-polyfill', './src/index.js']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [
                    'eslint'
                ],
            },
            {
                test: /\.js?$/,
                exclude: /node_modules\/(?!(cron\-parser)\/).*/,
                use: [
                    'babel'
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    fallbackLoader: 'vue-style-loader'
                })
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    loader: ['css-loader', 'stylus-loader'],
                    fallbackLoader: 'vue-style-loader'
                })
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    'svg-inline?classPrefix'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=images/[name].[ext]"
            },
            {
                test: /\.json$/,
                use: [
                    'json'
                ]
            }
        ]
    },

    devServer: {
        contentBase: "./public",
        // do not print bundle build stats
        noInfo: true,
        // enable HMR
        // hot: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST
    },

    plugins: [
        new ExtractTextPlugin('style.css')
    ],

    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        extensions: ['.js', '.css']
    },

    resolveLoader: {
        moduleExtensions: ['-loader']
    }
};