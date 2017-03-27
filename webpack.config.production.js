'use strict';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.base');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: false
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     beautify: false,
        //     mangle: true,
        //     compress: {
        //         warnings: false
        //     },
        //     comments: false
        // }),
        // new webpack.optimize.DedupePlugin(),
        new ImageminPlugin({
            svgo: {
                removeEmptyContainers: true,
                collapseGroups: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            files: {
                css: ['style.css'],
                js: ["bundle.js"],
            }
        }),
    ]
});