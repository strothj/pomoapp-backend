/**
 * Application entry point.
 */
import { Server } from 'http';
import { loadConfig } from './config';
import { initDatabase } from './database';
import { startServer } from './server';

let server: Server = null;

function runServer(): Promise<void> {
  return new Promise<void>(async (resolve) => {
    if (server) {
      resolve();
      return;
    }
    const config = loadConfig();
    await initDatabase(config);
    server = await startServer(config);
    console.log(`Server listening on port ${config.port}`); // tslint:disable-line
    resolve();
  });
}

if (require.main === module) {
  runServer()
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { runServer };
