import * as path from 'path';
import * as dotenv from 'dotenv';
import { Auth0Config } from './auth0-authentication.config';
import { DatabaseConfig } from './database.config';
import { StaticConfig } from './static.config';

const defaultConnectionString = 'mongodb://127.0.0.1/test';

/**
 * Contains service settings.
 * 
 * @interface AppConfig
 * @extends {Auth0Config}
 * @extends {DatabaseConfig}
 * @extends {StaticConfig}
 */
interface AppConfig extends Auth0Config, DatabaseConfig, StaticConfig {
  serverPort: string;
}

/**
 * Loads the application settings from environment variables and defaults.
 * 
 * @returns {AppConfig}
 */
function loadConfig(): AppConfig {
  // Load variables from any present .env file.
  dotenv.config({ silent: true });

  const publicDir = process.env.ASSETS || path.resolve(__dirname, '../../node_modules/pomoapp-frontend/dist');
  return {
    authClientId: process.env.AUTH_CLIENT_ID || null,
    authClientSecret: process.env.AUTH_CLIENT_SECRET || null,
    databaseConnectionString: process.env.DB || defaultConnectionString,
    serverPort: process.env.PORT || 8080,
    staticAssets: path.join(publicDir, 'static'),
    staticIndex: path.join(publicDir, 'index.html')
  };
}

export { AppConfig, loadConfig };
