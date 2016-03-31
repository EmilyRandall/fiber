var path = require('path');
var webpack = require('webpack');

module.exports = {
  // execute each module with eval - fast build and reload, but not production supported
  devtool: 'eval',
  entry: {
    app : [
      // create localhost server at localhost:3000
      'webpack-dev-server/client?http://localhost:3000',
      // use hot module replacement, only reloading part of the code
      'webpack/hot/only-dev-server',
      // main file is index.js
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
    // Only reload part of the code when it changes
    new webpack.HotModuleReplacementPlugin()
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
      // for files that have a .js extension
      test: /\.js$/,
      // use 'react-hot' and 'babel' to load code
      loaders: ['react-hot', 'babel'],
      // don't include /node_modules
      exclude: /node_modules/,
      // include everything in ./lib
      include: [path.join(__dirname,'./lib')]
    },
    {
      // for files with a .xml extension
      test: /\.xml$/,
      // use 'raw' to load
      loader: "raw"
    },
    {
      // for files with a .json extension
      test: /\.json$/,
      // use 'json-loader' to load code
      loaders: ['json-loader']
    },
    {
      // for files with a .css extension
      test: /\.css?$/,
      // use 'style' and 'raw' to load code
      loaders: ['style', 'raw'],
      // include everthing in the current directory
      include: __dirname
    }]
  }
};
