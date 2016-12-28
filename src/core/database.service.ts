import * as mongoose from 'mongoose';
import * as express from 'express';
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
  private connected: boolean;

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
      mongoose.connect(this.config.databaseConnectionString,
        { server: { reconnectTries: Number.MAX_VALUE } })
          .then(() => {
            initialized = true;
            resolve();
          })
          .catch(reject);
      mongoose.connection.on('disconnected', () => {
        this.connected = false;
      });
      mongoose.connection.on('connected', () => {
        this.connected = true;
      });
    });
  }

  public statusMiddleware(): express.Handler {
    return (req, res, next) => {
      if (!this.connected) {
        res.sendStatus(500);
        return;
      }
      next();
    };
  }
}

export { DatabaseService };
