import * as mongoose from 'mongoose';
import { DatabaseConfig } from './database.config';

(<any> mongoose).Promise = Promise;

let initialized: boolean;

class DatabaseService {
  constructor(private config: DatabaseConfig) {}

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
