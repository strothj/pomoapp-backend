/**
 * Model unit test.
 */
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as mongoose from 'mongoose';
import { Model } from './model';

const expect = chai.expect;

describe('Model', () => {
  it('returns JSON with MongoDB fields removed', (done) => {
    const model = new Model('testModel', {
      user: { required: true, type: String },
      someField: { required: true, type: String }
    }).model;

    model.remove({}).exec().then(() => {
      model.create({ user: 'someUserId', someField: 'test' }).then((created) => {
        const id = created._id;
        expect(created.toJSON()).to.deep.equal({ id, someField: 'test' });
        done();
      });
    });
  });

  it('returns error on saving an item with no user account', (done) => {
    const model = new Model('testModel2', {
      someField: { required: true, type: String }
    }).model;
    model.create({ someField: 'test' }).catch((err: Error) => {
      expect(err.message).to.equal('No user account attached to item');
      done();
    });
  });
});
