import * as mongoose from 'mongoose';

type BaseSchema<T> = {
  [P in keyof T]: mongoose.SchemaTypeOpts<any>;
};

export { BaseSchema };
