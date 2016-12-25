/**
 * Base entity type. Adds fields for user account and api friendly id field.
 * 
 * @interface Entity
 */
interface Entity {
  /**
   * Account id of user the database entry belongs to.
   * 
   * @type {string}
   * @memberOf Entity
   */
  user?: string;
  /**
   * Database id of the entry. Populated in the schema toJSON method.
   * 
   * @type {string}
   * @memberOf Entity
   */
  id?: string;
}

export { Entity };
