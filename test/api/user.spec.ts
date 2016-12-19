/**
 * Placeholder
 */
import { Server } from 'http';
import * as chai from 'chai';
import { runServer } from '../../src/main';
import { User } from '../../src/models/user';
import { dummyUser } from '../../src/api/authentication';

chai.should();

describe('User', () => {
  let server: Server;

  before(async () => { server = await runServer(); });

  after((done) => { server.close(done); });

  it('should return 404 when not present', async () => {
    await User.remove({ user_id: dummyUser}).exec();
  });
});
