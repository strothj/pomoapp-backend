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

describe('ProjectRoutes', () => {
  let auth: MockAuthenticationService;
  let app: express.Application;

  before(() => {
    auth = new MockAuthenticationService();
    const projectRoutes = new ProjectRoutes(auth);
    app = express();
    app.use(projectRoutes.routes());
  });

  beforeEach((done) => {
    projectModel.remove({ user: auth.mockUser() }).exec().then(() => { done(); });
  });

  it('returns empty list when no projects present', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal([]);
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

  it('adds new item to list', (done) => {
    const expected: Project = {
      name: 'project', favorited: true, archived: false
    };
    chai.request(app).post('/').send(expected).end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(201);
      expect(res.body.id).to.be.a('string');
      const id = res.body.id;
      delete(res.body.id);
      expect(res.body).to.deep.equal(expected);
      projectModel.findOne({ user: auth.mockUser() }).exec().then((item) => {
        expect(item._id.toString()).to.equal(id);
        done();
      });
    });
  });

  it('edit updates existing item', (done) => {
    const expected: Project = {
      name: 'project', favorited: false, archived: false
    };
    projectModel.create({ user: auth.mockUser(), ...expected }).then((created) => {
      expected.id = created._id.toString();
      expected.name = 'new project name';
      chai.request(app).put(`/${expected.id}`).send(expected).end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(204);
        projectModel.findOne({ user: auth.mockUser() }).exec().then((updated) => {
          expect(updated.name).to.equal(expected.name);
          done();
        });
      });
    });
  });
});
