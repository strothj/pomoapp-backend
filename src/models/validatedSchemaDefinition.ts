import { SchemaDefinition } from 'mongoose';

/**
 * Mongoose schema with validation required on all fields.
 *
 * @type ValidatedSchemaDefinition
 */
type ValidatedSchemaDefinition<T> = {
  [P in keyof T]: SchemaDefinition[P]
};

export { ValidatedSchemaDefinition };
