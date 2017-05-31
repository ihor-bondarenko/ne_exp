var webpack = require("webpack");
var path = require("path");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackChunkHash = require("webpack-chunk-hash");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        a: "./a.js",
        b: "./b.js",
        vendor: ["jquery", "lodash"]
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js"
    },
    module: {rules: [
        /*{
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
            }
        }*/
    ]},
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendor", "manifest"],
            minChunks: Infinity
        }),
        new webpack.EnvironmentPlugin({
            "NODE_ENV": "development",
            DEBUG: true
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        new ChunkManifestPlugin({
            filename: "chunk-manifest.json",
            manifestVariable: "webpackManifest",
            inlineManifest: true
        }),
        new webpack.ProvidePlugin({
           /* $: 'jquery',
            jQuery: 'jquery'*/
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin()
    ]
};