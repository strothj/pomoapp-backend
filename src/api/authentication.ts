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
}

interface IRequestWithSubscription extends Request {
  user: { sub: string; };
}

/**
 * Middleware that protects routes using JWT authentication.
 *
 * @param {IAuthenticationConfig} config
 * ClientID and ClientSecret needed to perform validation.
 * @returns {jwt.RequestHandler}
 */
function authentication(config: IAuthenticationConfig): Handler[] {
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

export { IAuthenticationConfig, authentication };
