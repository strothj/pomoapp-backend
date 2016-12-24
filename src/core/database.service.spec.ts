/**
 * Database service tests.
 * 
 * @module core/database.service.spec
 */
import * as mocha from 'mocha';
import { loadConfig } from './configuration.service';
import { DatabaseService } from './database.service';

describe('Database', () => {
  it('does not return error when told to connect multiple times', (done) => {
    const config = loadConfig();
    const db = new DatabaseService(config);
    db.connect()
      .then(db.connect)
      .then(done);
  });
});
