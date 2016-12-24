import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AuthenticationService } from '../core';
import { ProjectService } from './project.service';

/**
 * Provides Express routes for manipulating projects.
 * 
 * @class ProjectRoutes
 */
class ProjectRoutes {
  private readonly service: ProjectService;
  private readonly user: (req: express.Request) => string;

  constructor(auth: AuthenticationService) {
    this.service = new ProjectService();
    this.user = auth.user;
  }

  private getAll: express.Handler = async (req, res, next) => {
    try {
      const user = this.user(req);
      const found = await this.service.find({ user });
      const response = found.map((item) => { return this.service.stripMongoFields(item); });
      res.json(response);
    } catch (err) {
      next(err);
    }
  };

  public routes(): express.Router {
    const router = express.Router();
    router.use('/', bodyParser.json());
    router.get('/', this.getAll);
    return router;
  }
}

export { ProjectRoutes };