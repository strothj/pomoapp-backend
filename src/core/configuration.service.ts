import * as path from 'path';
import { DatabaseConfig } from './database.config';
import { StaticConfig } from './static.config';

const defaultConnectionString = 'mongodb://127.0.0.1/test';

/**
 * Contains service settings.
 * 
 * @interface AppConfig
 * @extends {DatabaseConfig}
 * @extends {StaticConfig}
 */
interface AppConfig extends DatabaseConfig, StaticConfig {
  serverPort: string;
}

/**
 * Loads the application settings from environment variables and defaults.
 * 
 * @returns {AppConfig}
 */
function loadConfig(): AppConfig {
  const publicDir = process.env.ASSETS || path.resolve(__dirname, '../../node_modules/pomoapp-frontend/dist');
  return {
    databaseConnectionString: process.env.DB || defaultConnectionString,
    serverPort: process.env.PORT || 8080,
    staticAssets: path.join(publicDir, 'static'),
    staticIndex: path.join(publicDir, 'index.html')
  };
}

export { AppConfig, loadConfig };
