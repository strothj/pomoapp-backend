import { AuthenticationService } from '../core';
import { Routes } from '../shared';
import { TaskEntity, taskModel } from '.';

/**
 * Task Express routes.
 * 
 * @class TaskRoutes
 * @extends {Routes<TaskEntity>}
 */
class TaskRoutes extends Routes<TaskEntity> {
  constructor(auth: AuthenticationService) {
    super(auth, taskModel);
  }
}

export { TaskRoutes };
