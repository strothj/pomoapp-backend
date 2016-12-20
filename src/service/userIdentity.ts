/**
 * A MongoDB document containing an attached user account.
 *
 * @interface IUserIdentity
 */
interface IUserIdentity {
  user_id: string;
  [key: string]: any;
}

export { IUserIdentity };
