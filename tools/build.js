/* eslint-disable no-console */

import path from 'path';
import { mkdir, rm } from 'shelljs';
import webpack from 'webpack';
import webpackConfig from './webpack.config';

const dist = path.resolve(__dirname, '../dist');

rm('-rf', dist);
mkdir(dist);

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(stats.toString({ colors: true }));
});
