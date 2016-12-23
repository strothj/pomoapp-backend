import * as mongoose from 'mongoose';
import { DatabaseConfig } from './database.config';

class Database {
  private initialized: boolean;
  private config: DatabaseConfig;

  constructor() {
    this.config = new DatabaseConfig();
    this.config.load();
  }

  public connect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.initialized) { resolve(); return; }
      mongoose.connect(this.config.connectionString)
        .then(resolve)
        .catch(reject);
    });
  }
}

export { Database };
