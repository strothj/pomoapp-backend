import * as express from 'express';

/**
 * Provides authentication services to Express routes.
 * 
 * @class AuthenticationService
 */
abstract class AuthenticationService {
  /**
   * Returns the user account of the authenticated user.
   * 
   * @abstract
   * @param {express.Request} req
   * @returns {string}
   * 
   * @memberOf AuthenticationService
   */
  public abstract user(req: express.Request): string;

  /**
   * Grants access to protected routes when a user has authenticated successfully.
   * 
   * @abstract
   * @returns {express.Handler}
   * 
   * @memberOf AuthenticationService
   */
  public abstract middleware(): express.Handler;
}

export { AuthenticationService }
