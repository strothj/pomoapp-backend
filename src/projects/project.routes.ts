import * as express from 'express';
import { AuthenticationService } from '../core';
import { ProjectService } from './project.service';

class ProjectRoutes {
  constructor(private service: ProjectService, private auth: AuthenticationService) {
  }

  private getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
    //
  }
}

export { ProjectRoutes };
