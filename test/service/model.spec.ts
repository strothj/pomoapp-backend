import * as chai from 'chai';
import { IUserIdentity } from '../../src/service/userIdentity';
import { Model } from '../../src/service/model';
import { initDatabase } from '../testutil';

chai.use(require('chai-http'));
const expect = chai.expect

interface ISomeType extends IUserIdentity {
  someField: boolean
}

describe('Model', () => {
  before(() => { return initDatabase(); });

  it('creates a useable MongoDB model', () => {
    const createTyped: ISomeType = {
      user_id: '123',
      someField: false
    }
    const model = new Model(createTyped, "modelTest", "modelTests");
    expect(model).to.exist;
    return model.model.update({ user_id: '123' }, createTyped, {
      upsert: true
    }).exec()
  });

});
