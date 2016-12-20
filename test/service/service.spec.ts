import * as chai from 'chai';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { IUserIdentity } from '../../src/service/userIdentity';
import { MongoDocument, Model } from '../../src/service/model';
import { Service } from '../../src/service/service';
import { initDatabase } from '../testutil';

chai.use(require('chai-http'));
const expect = chai.expect;

interface ITestModel extends IUserIdentity {
  someField: string
}

const dummyUserAccount = '123';

describe('Service', () => {
  let model: mongoose.Model<MongoDocument<ITestModel>>;
  let service: Service<ITestModel>;
  let app: express.Express;

  before(() => {
    return initDatabase().then(() => {
      const serviceModel = new Model<ITestModel>({ someField: '', user_id: '' }, 'testModel', 'testModels');
      service = new Service<ITestModel>(serviceModel, () => { return dummyUserAccount; });
      model = serviceModel.model;
      app = express();
      app.use(bodyParser.json());
      app.get('/findOne', service.findOne());
      app.post('/createOne', service.createOne());
    });
  });

  beforeEach((done) => {
    model.remove({ user_id: dummyUserAccount }).exec().then(() => { done(); });
  });

  it('findOne returns 404 on item does not exist', (done) => {
    chai.request(app).get('/findOne').end((err, res) => {
      expect(err).to.exist;
      expect(res).to.have.status(404);
      done();
    });
  });

  it('findOne returns item when it exists', (done) => {
    const item: ITestModel = { user_id: dummyUserAccount, someField: '456' };
    const expected: Partial<ITestModel> = { someField: '456' };
    model.create(item).then(() => {
      chai.request(app).get('/findOne').end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal(expected);
        done();
      });
    });
  });

  it('createOne returns error when item exists', (done) => {
    const item: ITestModel = { user_id: dummyUserAccount, someField: '456' };
    const newItem: Partial<ITestModel> = { someField: '789' };
    model.create(item).then(() => {
      chai.request(app).post('/createOne').send(newItem).end((err, res) => {
        expect(err).to.exist;
        expect(res).to.have.status(403);
        done();
      });
    });
  });
});
