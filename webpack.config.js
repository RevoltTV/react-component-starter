var _                 = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path');
var webpack           = require('webpack');

var pkg = require('./package.json');

var env = process.env.NODE_ENV;

var config = {
    devTool: 'cheap-module-eval-source-map',
    entry: {
        vendor: _.map(pkg.peerDependencies, function (value, key) { return key; })
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
        ]
    },
    node: {
        fs: "empty"
    },
    output: {
        library: ['Revolt', 'COMPONENT'],
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};

if (env === 'production') {
    config.devTool = 'cheap-module-source-map';
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js')
    );

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                warnings: false
            }
        })
    );
} else {
    config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    );
}

module.exports = config;
