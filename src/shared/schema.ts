import * as mongoose from 'mongoose';

/**
 * Mongoose Schema with all fields requiring validation objects.
 */
type Schema<T> = {
  [P in keyof T]: mongoose.SchemaTypeOpts<any>;
};

export { Schema };
