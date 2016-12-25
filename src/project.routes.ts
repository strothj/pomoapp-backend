import { AuthenticationService } from './core';
import { Routes } from './shared';
import { ProjectEntity } from './project.entity';
import { projectModel } from './project.model';

/**
 * Projects Express routes.
 * 
 * @class ProjectRoutes
 * @extends {Routes<ProjectEntity>}
 */
class ProjectRoutes extends Routes<ProjectEntity> {
  constructor(auth: AuthenticationService) {
    super(auth, projectModel);
  }
}

export { ProjectRoutes };
