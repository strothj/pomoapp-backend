/**
 * sortModel tests.
 */
import * as mocha from 'mocha';
import { expect } from 'chai';

import { MockAuthenticationService } from '../core';
import { ProjectEntity, projectModel } from '../projects';
import { SortEntity, sortModel } from '.';

describe('sortModel', () => {
  let auth: MockAuthenticationService;
  const project = projectModel;
  const sort = sortModel;

  before(() => {
    auth = new MockAuthenticationService();
  });

  beforeEach(async () => {
    await project.remove({}).exec();
    await sort.remove({}).exec();
  });

  it('returns error when adding sorting that references a project that does not exist', (done) => {
    const sortEntity: SortEntity = {
      user: auth.mockUser(),
      target: 'asdfasdfasdf',
      sort: '123|334'
    };
    sort.create(sortEntity).catch((err) => {
      expect(err.message).to.equal('Project does not exist');
      done();
    });
  });

  it('allows adding sorting for "projects" and "favorites" lists', async () => {
    const sortEntity: SortEntity = {
      user: auth.mockUser(),
      target: 'projects',
      sort: '123|456'
    };
    await sort.create(sortEntity);
    sortEntity.target = 'favorites';
    await sort.create(sortEntity);
  });

  it('returns error on creation of multiple "projects" or "favorites" sortings', (done) => {
    const sortEntity: SortEntity = {
      user: auth.mockUser(),
      target: 'projects',
      sort: '123|456'
    };
    sort.create(sortEntity).then((val) => {
      expect(val).to.exist;
      sort.create(sortEntity).catch((err) => {
        expect(err.message).to.equal('Cannot have multiple of this sorting type');
        done();
      });
    });
  });
});
