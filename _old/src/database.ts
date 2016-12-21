import * as mongoose from 'mongoose';

(<any>mongoose).Promise = Promise;

/**
 * An object containing the database settings.
 *
 * @interface IDatabaseConfig
 */
interface IDatabaseConfig {
  /**
   * MongoDB connection string.
   *
   * @type {string}
   * @memberOf IDatabaseConfig
   */
  databaseConnectionString: string;
}

/**
 * Connects to MongoDB database using the provided config.
 *
 * @param {IDatabaseConfig} config
 * @returns {Promise<void>}
 */
function initDatabase(config: IDatabaseConfig): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    mongoose.connect(config.databaseConnectionString, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export { IDatabaseConfig, initDatabase };
