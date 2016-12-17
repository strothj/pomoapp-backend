/**
 * Application entry point.
 */
import { Config } from './Config';
import { initDatabase } from './Database';
import { startServer } from './Server';

(async () => {
  try {

    const config = Config.LOAD();
    await initDatabase(config);
    await startServer(config);
    console.log(`Server listening on port ${config.port}`); // tslint:disable-line

  } catch (err) {

    console.error(err);
    process.exit(1);

  }
})();
