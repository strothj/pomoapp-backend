import { Database } from './database.service';

describe('Database', () => {
  it('not return error when told to connect multiple times', (done) => {
    const db = new Database();
    db.connect()
      .then(db.connect)
      .then(done);
  });
});
