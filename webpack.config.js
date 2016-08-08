const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  source: path.join(__dirname, 'src'),
  assets: path.join(__dirname, 'assets'),
  examples: path.join(__dirname, 'examples')
};

process.env.BABEL_ENV = TARGET;

const common = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.examples + '/build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [ 'react-hot', 'babel' ],
        include: [PATHS.source, PATHS.examples],
        exclude: /node_modules/
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [PATHS.source],
        exclude: /node_modules/
      }
    ]
  },
  postcss: function() {
    return[
      autoprefixer()
    ];
  }
};

if ( TARGET === 'start' ) {
  module.exports = merge(common, {
    entry: [
      'webpack/hot/dev-server',
      PATHS.examples + '/example.js'
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: PATHS.examples,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'only-errors',
      port: 3000
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
          include: [PATHS.source, PATHS.examples],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new HtmlWebpackPlugin({
        template: PATHS.examples + '/index.html'
      }),
      new webpack.NoErrorsPlugin()
    ]
  });
}

if ( TARGET === 'build:examples' ) {
  const extractScss = new ExtractTextPlugin(PATHS.examples + '/build/stylesheets/style.css', {
    allChunks: true
  });

  module.exports = merge(common, {
    entry: PATHS.examples + '/example.js',
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: extractScss.extract(['css?sourceMap', 'postcss', 'sass?sourceMap']),
          include: [PATHS.src, PATHS.examples],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      extractScss,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true
        }
      }),
      new HtmlWebpackPlugin({
        template: PATHS.examples + '/index.html'
      }),
      new webpack.NoErrorsPlugin()
    ]
  });
}
