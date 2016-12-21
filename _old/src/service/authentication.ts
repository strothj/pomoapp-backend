/**
 * Provides authentication services.
 *
 * @module service/authentication
 */
import { Request } from 'express';

/**
 * Retrieves the user account of the authenticated user.
 *
 * @interface IUserAccountReader
 */
interface IUserAccountReader {
  (req: Request): string;
}

export { IUserAccountReader };
