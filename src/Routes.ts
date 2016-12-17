import * as express from 'express';
import Express = express.Express;

/**
 * An object containing the route settings.
 *
 * @interface IRoutesConfig
 */
interface IRoutesConfig {
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
  app.use('*', (_, res) => { res.sendFile(config.indexFilePath); });
}

export { IRoutesConfig, addRoutes };
