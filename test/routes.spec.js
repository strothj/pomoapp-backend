import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, runServer } from '../src/main';

chai.use(chaiHttp);
const should = chai.should();

describe('Index', () => {

  before((done) => {
    runServer((err) => {
      if (err) {
        done(err);
        return;
      }
      done();
    });
  });

  it('should return status OK', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });

});
