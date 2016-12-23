import { DatabaseConfig } from './database.config';

const defaultConnectionString = 'mongodb://127.0.0.1/test';

interface AppConfig extends DatabaseConfig {};

function loadConfig(): AppConfig {
  return <AppConfig> {
    databaseConnectionString: process.env.DB || defaultConnectionString,
  };
}

export { AppConfig, loadConfig };
