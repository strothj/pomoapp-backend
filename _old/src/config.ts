/**
 * Configuration loading module.
 *
 * @module config
 */
import * as fs from 'fs';
import * as path from 'path';
import { IAuthenticationConfig } from './api/authentication';
import { IDatabaseConfig } from './database';
import { IServerConfig } from './server';

const defaultStaticPath = '../node_modules/pomoapp-frontend/dist';
const defaultDBConnectionString = 'mongodb://127.0.0.1/pomoapp-test';

// tslint:disable-next-line:no-empty-interfaces
interface IConfig extends IAuthenticationConfig, IDatabaseConfig, IServerConfig {}

/**
 * Loads application settings from the environment.
 *
 * @returns {IConfig}
 */
function loadConfig(): IConfig {
  const publicPath = process.env.PUBLIC_PATH || path.resolve(__dirname, defaultStaticPath);
  if (!fs.existsSync(publicPath)) {
    throw new Error(`Public asset path does not exist: ${publicPath}`);
  }

  return {
    databaseConnectionString: process.env.MONGO || defaultDBConnectionString,
    jwtSecret: process.env.JWT_SECRET,
    jwtAudience: process.env.JWT_AUDIENCE,
    disableAuthentication: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 8080,
    indexFilePath: path.join(publicPath, 'index.html'),
    staticPath: path.join(publicPath, 'static')
  };
}

export { IConfig, loadConfig };
