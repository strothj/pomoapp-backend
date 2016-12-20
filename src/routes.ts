import * as express from 'express';
import { Express } from 'express';
import * as bodyParser from 'body-parser';

import { IAuthenticationConfig, authentication } from './api/authentication';
import { projectsApp } from './api/projects';
import { userApp } from './api/user';

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
  app.use('/api/v1', bodyParser.json());
  app.use('/api/v1/projects', projectsApp);
  app.use('/api/v1/user', userApp);
  app.get('*', (_, res) => {
    res.sendFile(config.indexFilePath);
  });
}

export { IRoutesConfig, addRoutes };
