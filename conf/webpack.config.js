const path = require('path');
const webpack = require('webpack');
const externals = require('webpack-node-externals');
const package = require('../package');
const debug = process.argv.indexOf('--debug') !== -1;

const config = {
    debug: debug,
    context: path.resolve(__dirname, '..'),
    target: 'node',
    entry: ['./index.js'],
    output: {
        path: './dist',
        libraryTarget: 'commonjs',
        filename: `${package.name}.js`
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules|dist/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['add-module-exports']
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [],
    externals: [externals()]
};

if (!debug) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: false
    }));
}

module.exports = config;
