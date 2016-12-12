import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default {
  context: path.resolve(__dirname, '../src'),
  entry: './main',
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    loaders: [
      { test: /.js/, include: [path.resolve(__dirname, '../src')], loader: 'babel-loader' },
    ],
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
};
