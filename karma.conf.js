const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  assets: path.join(__dirname, 'assets'),
  test: path.resolve(__dirname, 'test')
}

module.exports = function (config) {

  config.set({
    singleRun: true,
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    frameworks: ['mocha'],
    files: [
      'karma.webpack.js'
    ],
    preprocessors: {
      'karma.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha', 'coverage' ],
    coverageReporter: {
      reporters: [
        process.env.TRAVIS
          ? { type: 'lcov' }
          : { type: 'html', dir: 'coverage' },
      ]
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel',
            include: [PATHS.src, PATHS.test],
            exclude: /node_modules/
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap'],
            include: PATHS.src,
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loader: 'json'
          }
        ],
        preLoaders: [
          {
            test: /\.jsx?$/,
            loader: 'isparta?',
            include: PATHS.src,
            exclude: /node_modules/
          },
          {
            test: /\.jsx?$/,
            loader: 'eslint',
            include: PATHS.src,
            exclude: /node_modules/
          }
        ]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },
    postcss: function() {
      return[
        autoprefixer()
      ];
    },
    webpackServer: {
      noInfo: true
    }
  });
};
