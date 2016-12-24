/**
 * Project routes tests.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // tslint:disable-line
import * as express from 'express';

import { MockAuthenticationService } from '../core';
import { ProjectRoutes, projectModel, Project } from '.';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Project', () => {
  let auth: MockAuthenticationService;
  let app: express.Application;

  before((done) => {
    auth = new MockAuthenticationService();
    const projectRoutes = new ProjectRoutes(auth);
    app = express();
    app.use(projectRoutes.routes());
    projectModel.remove({ user: auth.mockUser() }).exec().then(() => { done(); });
  });

  it('returns empty list when no projects present', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(200);
      done();
    });
  });

  it('returns item list when projects present', (done) => {
    const expected: Project[] = [
      { name: 'project1', favorited: false, archived: true },
      { name: 'project2', favorited: true, archived: false }
    ];
    projectModel.create([
      { user: auth.mockUser(), ...expected[0] },
      { user: auth.mockUser(), ...expected[1] }
    ]).then((created) => {
      expected[0].id = created[0]._id.toString();
      expected[1].id = created[1]._id.toString();
      chai.request(app).get('/').end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expected);
        done();
      });
    });
  });
});
