import * as chai from 'chai';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { IUserIdentity } from '../../src/service/userIdentity';
import { MongoDocument, Model } from '../../src/service/model';
import { SingleItemResource, MultiItemResource } from '../../src/service/resource';
import { initDatabase } from '../testutil';

chai.use(require('chai-http'));
const expect = chai.expect;

interface ITestModel extends IUserIdentity {
  someField: string
}

interface ITestModelWithID extends ITestModel {
  id: string
}

const dummyUserAccount = '123';

describe('Resource', () => {
  let serviceModel: Model<ITestModel>;
  let model: mongoose.Model<MongoDocument<ITestModel>>;
  let service: SingleItemResource<ITestModel> | MultiItemResource<ITestModel>;
  let app: express.Express;

  before(() => {
    return initDatabase().then(() => {
      serviceModel = new Model<ITestModel>({ someField: '', user_id: '' }, 'testModel', 'testModels');
      model = serviceModel.model;
    });
  });

  beforeEach((done) => {
    model.remove({ user_id: dummyUserAccount }).exec().then(() => { done(); });
  });

  describe('SingleItemResource', () => {

    before(() => {
      service = new SingleItemResource<ITestModel>(serviceModel, () => { return dummyUserAccount; });
      app = express();
      app.use(bodyParser.json());
      app.get('/', service.read());
      app.post('/', service.create());
      app.put('/', service.update());
      app.delete('/', service.del());
    });

    it('read returns 404 on item does not exist', (done) => {
      chai.request(app).get('/').end((err, res) => {
        expect(err).to.exist;
        expect(res).to.have.status(404);
        done();
      });
    });

    it('read returns item when it exists', (done) => {
      const item: ITestModel = { user_id: dummyUserAccount, someField: '456' };
      const expected: Partial<ITestModel> = { someField: '456' };
      model.create(item).then(() => {
        chai.request(app).get('/').end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(expected);
          done();
        });
      });
    });

    it('create returns error when item exists', (done) => {
      const item: ITestModel = { user_id: dummyUserAccount, someField: '456' };
      const newItem: Partial<ITestModel> = { someField: '789' };
      model.create(item).then(() => {
        chai.request(app).post('/').send(newItem).end((err, res) => {
          expect(err).to.exist;
          expect(res).to.have.status(403);
          done();
        });
      });
    });

    it('create creates item', (done) => {
      const newItem: Partial<ITestModel> = { someField: '456' };
      chai.request(app).post('/').send(newItem).end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(201);
        expect(res.body).to.deep.equal(newItem);
        model.find({ user_id: dummyUserAccount }).exec().then(() => {
          done();
        });
      });
    });

    it('update returns error when item does not exist', (done) => {
      const update: Partial<ITestModel> = { someField: '789'};
      chai.request(app).put('/').send(update).end((err, res) => {
        expect(err).to.exist;
        expect(res).to.have.status(403);
        done();
      });
    });

    it('update updates item', (done) => {
      const item: ITestModel = { user_id: dummyUserAccount, someField: '456' };
      const update: Partial<ITestModel> = { someField: '789' };
      model.create(item).then(() => {
        chai.request(app).put('/').send(update).end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          model.findOne({ user_id: dummyUserAccount }).exec().then((item) => {
            expect(item.someField).to.equal('789');
            done();
          });
        });
      });
    });

    it('delete removed item that exists', (done) => {
      const item: ITestModel = { user_id: dummyUserAccount, someField: '456' };
      model.create(item).then(() => {
        chai.request(app).del('/').end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(204);
          model.findOne({ user_id: dummyUserAccount }).exec().then((item) => {
            expect(item).to.not.exist;
            done();
          });
        });
      });
    });

    it('delete returns successful response on item that does not exist', (done) => {
      chai.request(app).del('/').end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(204);
        done();
      });
    });
  });

  describe('MultiItemResource', () => {

    before(() => {
      service = new MultiItemResource<ITestModel>(serviceModel, () => { return dummyUserAccount; });
      app = express();
      app.use(bodyParser.json());
      app.get('/', service.readAll());
      // app.get('/', service.read());
      // app.post('/', service.create());
      // app.put('/', service.update());
      // app.delete('/', service.del());
    });

    it('readAll returns empty array when there are no items', (done) => {
      chai.request(app).get('/').end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal([]);
        done();
      });
    });

    it('readAll returns array of items', (done) => {
      const items: Partial<ITestModel>[] = [
        { user_id: dummyUserAccount, someField: '123' },
        { user_id: dummyUserAccount, someField: '456' }
      ];
      let expected: Partial<ITestModel>[];
      model.create(items).then((items) => {
        expected = items.map<Partial<ITestModel>>((item) => {
          return { id: item._id.toString(), someField: item.someField };
        });
        chai.request(app).get('/').end((err, res) => {
          expect(err).to.not.exist;
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal(expected);
          done();
        });
      });
    });

    it('create creates a new item', (done) => {
      const newItem: Partial<ITestModel> = { someField: '123' };
      let expected: Partial<ITestModelWithID>;
      chai.request(app).post('/').send(newItem).end((err, res) => {
        expect(err).to.not.exist;
        expect(res).to.have.status(201);
        model.findOne({ user_id: dummyUserAccount }).exec().then((item) => {
          expected = { someField: '123', id: item._id };
          expect(res.body).to.deep.equal(expected);
          done();
        });
      });
    });

  });

});
