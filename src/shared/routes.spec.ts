/**
 * Routes tests.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // tslint:disable-line
import * as express from 'express';
import * as mongoose from 'mongoose';

import { MockAuthenticationService } from '../core';
import { Entity, Model, Routes } from '.';

interface TestEntity extends Entity {
  someField: string;
}

chai.use(chaiHttp);
const expect = chai.expect;

describe('Routes', () => {
  let auth: MockAuthenticationService;
  let app: express.Application;
  let model: mongoose.Model<TestEntity & mongoose.Document>;

  before(() => {
    auth = new MockAuthenticationService();
    const schema: mongoose.SchemaDefinition = {
      user: { required: true, type: String },
      someField: { required: true, type: String }
    };
    const modelC = new Model<TestEntity>('routeTestModel', schema);
    const routes = new Routes<TestEntity>(auth, modelC);
    model = modelC.model;
    app = express();
    app.use(routes.router());
  });

  beforeEach((done) => {
    model.remove({ user: auth.mockUser() }).exec().then(() => { done(); });
  });

  it('returns empty list when no items present', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal([]);
      done();
    });
  });

  it('returns item list when items present', (done) => {
    const expected: TestEntity[] = [
      { someField: 'test1' },
      { someField: 'test2' }
    ];
    model.create([
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
    const expected: TestEntity = { someField: 'test' };
    chai.request(app).post('/').send(expected).end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(201);
      expect(res.body.id).to.be.a('string');
      const id = res.body.id;
      delete(res.body.id);
      expect(res.body).to.deep.equal(expected);
      model.findOne({ user: auth.mockUser() }).exec().then((item) => {
        expect(item._id.toString()).to.equal(id);
        done();
      });
    });
  });

  it('edit updates existing item', (done) => {
    const expected: TestEntity = { someField: 'test' };
    model.create({ user: auth.mockUser(), ...expected }).then((created) => {
      expected.id = created._id.toString();
      expected.someField = 'changed field';
      chai.request(app).put(`/${expected.id}`).send(expected).end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(204);
        model.findOne({ user: auth.mockUser() }).exec().then((updated) => {
          expect(updated.someField).to.equal(expected.someField);
          done();
        });
      });
    });
  });

  it('delete removes existing item', (done) => {
    const item: TestEntity = { someField: 'test' };
    model.create({ user: auth.mockUser(), ...item }).then((created) => {
      const id = created._id.toString();
      chai.request(app).del(`/${id}`).end((err, res) => {
        expect(err).to.not.exist;
        expect(res.body).to.be.empty;
        model.findOne({ user: auth.mockUser() }).exec().then((item) => {
          expect(item).to.not.exist;
          done();
        });
      });
    });
  });
});
