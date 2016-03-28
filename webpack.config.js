var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path              = require('path')
var webpack           = require('webpack')

var env = process.env.NODE_ENV;

var config = {
    devTool: 'cheap-module-eval-source-map',
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
}

module.exports = config;
