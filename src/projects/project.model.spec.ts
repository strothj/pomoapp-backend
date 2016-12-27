/**
 * projectModel tests.
 */
import * as mocha from 'mocha';
import { expect } from 'chai';

import { MockAuthenticationService } from '../core';
import { TaskEntity, taskModel } from '../tasks';
import { SortEntity, sortModel } from '../sorts';
import { ProjectEntity, projectModel } from '.';

describe('projectModel', () => {
  let auth: MockAuthenticationService;
  const project = projectModel;
  const task = taskModel;
  const sort = sortModel;

  before(async () => {
    auth = new MockAuthenticationService();
    await project.remove({}).exec();
    await task.remove({}).exec();
    await sort.remove({}).exec();
  });

  it('removes tasks when project is removed', async () => {
    const projectEntity: ProjectEntity = {
      user: auth.mockUser(), name: 'name', favorited: false, archived: false
    };
    const createdProject = await project.create(projectEntity);
    const taskEntity: TaskEntity = {
      projectId: createdProject._id.toString(),
      ...projectEntity
    }
    await task.create(taskEntity);
    await createdProject.remove();
    const foundTask = await task.findOne({}).exec();
    expect(foundTask).to.not.exist;
  });

  it('removed sortings when project is removed', async () => {
    const projectEntity: ProjectEntity = {
      user: auth.mockUser(), name: 'name', favorited: false, archived: false
    }
    const createdProject = await project.create(projectEntity);
    const sortEntity: SortEntity = {
      user: auth.mockUser(), target: createdProject._id, sort: '123|456'
    };
    await sort.create(sortEntity);
    await createdProject.remove();
    const foundSort = await sort.findOne({}).exec();
    expect(foundSort).to.not.exist;
  });
});
