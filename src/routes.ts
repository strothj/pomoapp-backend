import * as express from 'express';
import { Express, Handler, Response, Request } from 'express';
import * as bodyParser from 'body-parser';
import { IUserIdentity } from './models/user';
import { IProject, Project } from './models/project';
import { IAuthenticationConfig, authentication } from './api/authentication';

interface IRequestWithUser extends Request {
  user: IUserIdentity;
}

// const placeholderAuthentication: Handler = (req: IRequestWithUser, _, next) => {
//   req.user = { user_id: '123' };
//   next();
// };

const getProjects: Handler = async (req: IRequestWithUser, res: Response) => {
  let projects: IProject[];
    console.log(req.user); // tslint:disable-line
  try {
    projects = await Project.find({ user_id: req.user.user_id });
    res.json({
      projects
    });
    res.status(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const addProject: Handler = async (req: IRequestWithUser, res: Response) => {
  let project: IProject;
  try {
    project = req.body;
    project.user_id = req.user.user_id;
    console.log(req.user); // tslint:disable-line
    const newProject = await Project.create(project);
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

/**
 * An object containing the route settings.
 *
 * @interface IRoutesConfig
 */
interface IRoutesConfig extends IAuthenticationConfig {
  indexFilePath: string;
  staticPath: string;
}

/**
 * Adds the server routes to the Express server.
 *
 * @param {IRoutesConfig} config
 * @param {Express} app
 */
function addRoutes(config: IRoutesConfig, app: Express) {
  app.use('/static', express.static(config.staticPath));
  app.use('/api/v1', authentication(config));
  app.use('/api/v1/projects', bodyParser.json());
  app.get('/api/v1/projects', getProjects);
  app.post('/api/v1/projects', addProject);
  app.get('*', (req: IRequestWithUser, res) => {
    console.log(req.user); // tslint:disable-line:no-console
    res.sendFile(config.indexFilePath);
  });
}

export { IRoutesConfig, addRoutes };
