var autoprefixer      = require('autoprefixer');
var path              = require('path')
var webpack           = require('webpack')

module.exports = {
    devServer: {
        colors: true,
        contentBase: './example',
        publicPath: '/static/'
    },
    devtool: 'inline-source-map',
    entry: [
        './example/client/index.js'
    ],
    node: {
        fs: 'empty'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin()
    ],
    module: {
        loaders: [{
            test: /\.styl$/,
            loader: 'style-loader!css-loader!postcss-loader!stylus-loader'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            include: path.join(__dirname, '../'),
            query: {
                plugins: [ 'add-module-exports' ],
                presets: [ 'es2015', 'stage-0', 'react', 'react-hmre' ]
            }
        }]
    },
    postcss: function ()  {
        return [autoprefixer]
    },
    stylus: {
        use: [require('nib')(), require('@revolttv/revolt-styles')()],
        import: ['~@revolttv/revolt-styles/lib/revolt-styles/index.styl']
    }
}
