import { AuthenticationService } from './core';
import { Routes } from './shared';
import { TaskEntity } from './task.entity';
import { taskModel } from './task.model';

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
