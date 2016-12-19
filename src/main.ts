/**
 * Application entry point.
 */
import { Server } from 'http';
import { loadConfig } from './config';
import { initDatabase } from './database';
import { startServer } from './server';

function runServer(): Promise<Server> {
  return new Promise<Server>(async (resolve) => {
    const config = loadConfig();
    await initDatabase(config);
    resolve(await startServer(config));
    console.log(`Server listening on port ${config.port}`); // tslint:disable-line
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
