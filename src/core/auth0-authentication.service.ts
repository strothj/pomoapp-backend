/**
 * Provides authentication services using Auth0.com
 * 
 * @module core/auth0-authentication.service
 */
import * as express from 'express';
import * as jwtCheck from 'express-jwt';
import { AuthenticationService } from '.';
import { Auth0Config } from './auth0-authentication.config';

interface IdentityRequest extends express.Request {
  user: { sub: string };
}

interface UserIdentity {
  userId: string;
}

interface AuthenticatedRequest extends express.Request {
  user: UserIdentity;
}

class Auth0AuthenticationService implements AuthenticationService {
  private jwtMiddleware: jwtCheck.RequestHandler;

  constructor(config: Auth0Config) {
    if (!config.authClientId || !config.authClientSecret) {
      throw new Error('Missing authentication configuration!');
    }
    this.jwtMiddleware = jwtCheck({
      secret: config.authClientSecret,
      audience: config.authClientId
    });
  }

  public user(req: AuthenticatedRequest): string {
    return req.user.userId;
  }

  public middleware(): express.Handler[] {
    return [
      this.jwtMiddleware,
      (req: IdentityRequest, res, next) => {
        if (!req.user || !req.user.sub || req.user.sub.length === 0) {
          next(new Error('Unable to read user account from JWT'));
          return;
        }
        (<any>req).user = <UserIdentity>{ userId: req.user.sub };
        next();
      }
    ];
  }
}

export { UserIdentity, AuthenticatedRequest, Auth0AuthenticationService };
