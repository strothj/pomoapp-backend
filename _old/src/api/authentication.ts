/**
 * Provides JWT authentication middleware.
 *
 * @module api/authentication
 */
import { Handler, NextFunction, Response, Request } from 'express';
import * as jwt from 'express-jwt';
import { IUserIdentity } from '../models/user';

/**
 * Configuration for JWT authentication.
 *
 * @interface IAuthenticationConfig
 */
interface IAuthenticationConfig {
  jwtSecret: string;
  jwtAudience: string;
  disableAuthentication: boolean;
}

interface IRequestWithSubscription extends Request {
  user: { sub: string; };
}

/**
 * User account to use during testing and development.
 */
const dummyUser = '123';

/**
 * Middleware that protects routes using JWT authentication.
 *
 * @param {IAuthenticationConfig} config ClientID and ClientSecret needed to perform validation.
 * @returns {Handler[]}
 */
function authentication(config: IAuthenticationConfig): Handler[] {
  // Stub authentication for testing
  if (config.disableAuthentication) {
    return [(req, _, next) => {
      (<any>req).user = <IUserIdentity>{ user_id: dummyUser };
      next();
    }];
  }

  const handlers: Handler[] = [];

  handlers.push(jwt({
    secret: config.jwtSecret,
    audience: config.jwtAudience
  }));

  handlers.push((req: IRequestWithSubscription, _: Response, next: NextFunction) => {
    if (!req.user.sub || req.user.sub.length === 0) {
      next(new Error('Unable to read user account from JWT'));
      return;
    }
    (<any>req).user = <IUserIdentity>{ user_id: req.user.sub };
    next();
  });

  return handlers;
}

export { IAuthenticationConfig, authentication, dummyUser };
