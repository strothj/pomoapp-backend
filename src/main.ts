import { startApp } from './app';
import { loadConfig } from './core';

const config = loadConfig();

startApp(config);
