import * as mongoose from 'mongoose';

type Schema<T> = {
  [P in keyof T]: mongoose.SchemaTypeOpts<any>;
};

export { Schema };
