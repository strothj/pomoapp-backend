import * as mongoose from 'mongoose';
import { DatabaseConfig } from './database.config';

(<any> mongoose).Promise = Promise;

let initialized: boolean;

/**
 * Handles connecting to MongoDB database.
 * 
 * @class DatabaseService
 */
class DatabaseService {
  constructor(private config: DatabaseConfig) {}

  /**
   * Connects to MongoDB database. Can be called multiple times.
   * 
   * @returns {Promise<void>}
   * 
   * @memberOf DatabaseService
   */
  public connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (initialized) { resolve(); return; }
      mongoose.connect(this.config.databaseConnectionString)
        .then(() => {
          initialized = true;
          resolve();
        })
        .catch(reject);
    });
  }
}

export { DatabaseService };
