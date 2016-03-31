var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    // build app using ./lib/index.js
    app : [
      './lib/index.js'],
  },
  output: {
    // absolute path to output directory
    path: path.join(__dirname, './public/js/'),
    // create main file named app.js
    filename: `app.js`,
    // public address of output files, allows index.html to access code via path /js/app.js
    publicPath: '/js/'
  },
  plugins: [
    // set the process environment as a production environment
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    // Minimize all js output
    new webpack.optimize.UglifyJsPlugin({
    }),
  ],
  node: {
    fs: "empty"
  },
  resolve: {
    alias: {
      // when referencing 'react', replace with node_modules/react
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    // resolve modules using '' or '.js' extensions
    extensions: ['', '.js']
  },
  resolveLoader: {
    // if loaders can't be found, look for them in node_modules
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
    {
      // for files with a .js extension
      test: /\.js$/,
      // use 'react-hot' and 'babel' as loaders
      loaders: ['react-hot', 'babel'],
      // do not include node_modules
      exclude: /node_modules/,
      // include files in ./lib
      include: [path.join(__dirname,'./lib')]
    },
    {
      // for files with a .xml extension
      test: /\.xml$/,
      // use 'raw' as the loader
      loader: "raw"
    },
    {
      // for files with a .json extension
      test: /\.json$/,
      // use 'json-loader' as the loader
      loaders: ['json-loader']
    },
    {
      // for files with a .css extension
      test: /\.css?$/,
      // use 'style' and 'raw' as the loaders
      loaders: ['style', 'raw'],
      // include all files in the current directory
      include: __dirname
    }]
  }
};
