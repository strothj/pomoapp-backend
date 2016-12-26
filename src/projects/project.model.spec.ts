/**
 * projectModel tests.
 */
import * as mocha from 'mocha';
import { expect } from 'chai';

import { MockAuthenticationService } from '../core';
import { TaskEntity, taskModel } from '../tasks';
import { ProjectEntity, projectModel } from '.';

describe('projectModel', () => {
  let auth: MockAuthenticationService;
  const project = projectModel.model;
  const task = taskModel.model;

  before(async () => {
    auth = new MockAuthenticationService();
    await project.remove({}).exec();
    await task.remove({}).exec();
  });

  it('removes tasks when project is removed', async () => {
    const projectEntity: ProjectEntity = {
      user: auth.mockUser(),
      name: 'name',
      favorited: false,
      archived: false
    };
    const createdProject = await project.create(projectEntity);
    const taskEntity: TaskEntity = {
      projectId: createdProject._id.toString(),
      ...projectEntity
    }
    await task.create(taskEntity);
    const foundProject = await project.findOne({}).exec();
    expect(foundProject).to.exist;
    let foundTask = await task.findOne({}).exec();
    expect(foundTask).to.exist;
    await foundProject.remove();
    foundTask = await task.findOne({}).exec();
    expect(foundTask).to.not.exist;
  });
});
