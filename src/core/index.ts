/**
 * Core module exports.
 * 
 * @module core
 */
import { AppConfig, loadConfig } from './configuration.service';
import { AuthenticationService } from './authentication.service';
import { DatabaseService } from './database.service';
import { MockAuthenticationService } from './mock-authentication.service';
import { StaticRoutes } from './static.routes';

export {
  AppConfig,
  AuthenticationService,
  DatabaseService,
  loadConfig,
  MockAuthenticationService,
  StaticRoutes
};
