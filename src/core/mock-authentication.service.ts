import * as express from 'express';
import { AuthenticationService } from './authentication.service';

const userId = 'some-user';

/**
 * Placeholder authentication service. Always returns the same user account.
 * 
 * @class MockAuthenticationService 
 * @implements {AuthenticationService}
 */
class MockAuthenticationService implements AuthenticationService {
  public user(req: express.Request): string {
    return userId;
  }

  public middleware(): express.Handler {
    return (req, res, next) => {
      (<any>req).user = userId;
      next();
    };
  }

  public mockUser(): string {
    return userId;
  }
}

export { MockAuthenticationService };
