/**
 * Core module exports.
 * 
 * @module core
 */
import { AuthenticationService } from './authentication.service';
import { AppConfig, loadConfig } from './configuration.service';
import { DatabaseService } from './database.service';
import { StaticRoutes } from './static.routes';

export {
  AuthenticationService,
  AppConfig,
  DatabaseService,
  loadConfig,
  StaticRoutes
};
