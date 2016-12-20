/**
 * Projects API module.
 *
 * @module api/projects
 */
import * as express from 'express';
import { IProject, Project } from '../models/project';
import { RequestWithIdentity } from './types';

const projectsApp: express.Express = express();

projectsApp.get('/', async (req: RequestWithIdentity, res, next) => {
  try {
    const projects = await Project.find({ user_id: req.user.user_id }).exec();
    const projectsResp = {
      projects: projects.map<Partial<IProject>>((val) => {
        return {
          name: val.name,
          favorited: val.favorited,
          archived: val.archived
        };
      })
    };
    res.json(projectsResp);
  } catch (err) {
    next(err);
  }
});

export { projectsApp };
