/**
 * Test utility functions.
 *
 * @module test/testutil
 */
import * as mongoose from 'mongoose';
import { loadConfig } from '../src/config';

(<any>mongoose).Promise = Promise;

let connected = false;

async function initDatabase(): Promise<void> {
  const config = loadConfig();
  if (!connected) {
    await mongoose.connect(config.databaseConnectionString);
    connected = true;
  }
  return Promise.resolve();
}

export { initDatabase };
