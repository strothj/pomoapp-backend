import * as express from 'express';
import { IRoutesConfig, addRoutes } from './routes';

/**
 * An option containing the server settings.
 *
 * @interface IServerConfig
 * @extends {IRoutesConfig}
 */
interface IServerConfig extends IRoutesConfig {
  port: number;
}

/**
 * Starts the Express server using the provided settings.
 *
 * @param {IServerConfig} config
 * @returns {Promise<void>}
 */
function startServer(config: IServerConfig): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const app = express();
    addRoutes(config, app);
    const server = app.listen(config.port);
    server.on('listening', resolve);
    server.on('error', reject);
  });
}

export { IServerConfig, startServer };
