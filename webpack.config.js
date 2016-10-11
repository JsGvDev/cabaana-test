'use strict';

var path = require("path");
var webpack = require("webpack");

let srcPath = path.join(__dirname, '/source');
let publicPath = '/assets/';

module.exports = {
	cache: true,
	entry: path.join(__dirname, '/source/index'),
    output: {
        path: path.join(__dirname, '/dist/assets'),
        filename: 'index.min.js',
        publicPath: publicPath
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'react-hot!babel-loader'
          // 'babel-loader' is also a legal name to reference
          //query: {
            //presets: ['es2015','stage-0', 'react']
          //}
        },
        {
          test: /\.(png|jpg|gif|woff|woff2)$/,
          loader: 'url-loader?limit=8192'
        },
      ]
    },
	resolve: {
        extensions: ['', '.js', '.jsx'],
		alias: {
            css: srcPath + '/css/',
            js: srcPath + '/js/',
            lib: srcPath + '/lib/',
            components: srcPath + '/components/'
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			// Automtically detect jQuery and $ as free var in modules
			// and inject the jquery library
			// This is required by many jquery plugins
            $: "jquery",
            jQuery: "jquery"
		}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
	]
};
