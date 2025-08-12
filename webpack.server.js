const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, 'build-server'),
    filename: 'server.js',
    chunkFormat: 'commonjs',
  },
  externals: [nodeExternals({
    allowlist: [/\.css$/, /\.scss$/, /\.sass$/],
    additionalModuleDirs: ['node_modules']
  })],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /server\/index\.js$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 'current' } }],
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: 'ignore-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          emit: false,
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'global.window': '{}',
      'global.document': '{}',
      'global.navigator': '{}',
      'global.localStorage': '{}',
      'global.sessionStorage': '{}'
    })
  ],
  optimization: {
    minimize: false
  }
};