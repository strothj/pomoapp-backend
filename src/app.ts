import * as express from 'express';
import {
  AppConfig,
  AuthenticationService,
  DatabaseService,
  MockAuthenticationService,
  StaticRoutes
} from './core';
import { ProjectRoutes } from './project.routes';

/**
 * Application bootstrap module.
 * 
 * @module app
 */
let initilizated: boolean;

function startServer(app: express.Application, config: AppConfig): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(config.serverPort);
    server.on('error', reject);
    server.on('listening', resolve);
  });
}

async function startApp(config: AppConfig) {
  if (initilizated) { return; }
  let auth: AuthenticationService;

  if (process.env.NODE_ENV !== 'production') {
    auth = new MockAuthenticationService();
    console.error('Warning, using mock authentication service!');
  } else {
    // Use production authentication service
  }

  const db = new DatabaseService(config);
  const app = express();
  app.use('/api/v1/', auth.middleware());
  app.use('/api/v1/projects', new ProjectRoutes(auth).router());
  app.use(new StaticRoutes(config).routes());

  try {
    await db.connect();
    await startServer(app, config);
    console.log(`Server listening on port ${config.serverPort}`); // tslint:disable-line:no-console
    initilizated = true;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export { startApp };
