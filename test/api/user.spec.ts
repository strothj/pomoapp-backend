import * as chai from 'chai';
chai.use(require('chai-http'));
const expect = chai.expect;

import { Server } from 'http';
import { runServer } from '../../src/main';

import { IUser, User } from '../../src/models/user';
import { dummyUser } from '../../src/api/authentication';

const serverUrl = 'http://localhost:8080';

describe('User', () => {
  let server: Server;

  before(async () => {server = await runServer(); });

  after((done) => { server.close(done); });

  beforeEach(async () => { await User.remove({ user_id: dummyUser }); });

  it('should return 404 when not present', () => {
    chai.request(serverUrl)
      .get('/api/v1/user')
      .end((err, res) => {
        expect(err).to.exist;
        expect(res).to.have.status(404);
      });
  });

  it('should return user record when it exists', async () => {
    const userDoc: IUser = { user_id: dummyUser, lastHref: '/projects' };
    await User.create(userDoc);
    chai.request(serverUrl)
      .get('/api/v1/user')
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body).to.deep.equal({ lastHref: '/projects' });
      })
  });

  it('should create user record', async () => {
    chai.request(serverUrl)
      .put('/api/v1/user')
      .send({ lastHref: '/projects' })
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(201);
      });
    User.findOne({ user_id: dummyUser }).exec().then((doc) => {
      expect(doc.lastHref).to.equal('/projects');
    });
  });
});
