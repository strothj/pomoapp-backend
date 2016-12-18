/**
 * Module containing common types used in the API modules.
 *
 * @module api/types
 */
import { Request } from 'express';
import { IUserIdentity } from '../models/user';

/**
 * An Express request with a user identity attached.
 *
 * @interface RequestWithIdentity
 * @extends {Request}
 */
interface RequestWithIdentity extends Request {
  user: IUserIdentity;
}

export { RequestWithIdentity };
