/**
 * Static routes tests.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http'); // tslint:disable-line
import * as express from 'express';
import { loadConfig, StaticRoutes } from '.';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Static Routes', () => {
  let app: express.Application;

  before(() => {
    app = express();
    app.use('/', new StaticRoutes(loadConfig()).routes());
  });

  it('serves index.html from root', (done) => {
    chai.request(app).get('/').end((err, res) => {
      expect(err).to.not.exist;
      expect(res).to.have.status(200);
      done();
    });
  });

});
