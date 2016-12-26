import * as mongoose from 'mongoose';
import { Model } from '../shared';
import { SortEntity } from '.';

const sortSchema: mongoose.SchemaDefinition = {
  user: { required: true, type: String },
  target: { required: true, type: String },
  sort: { required: true, type: String }
};

/**
 * Sort model.
 */
const sortModel = new Model<SortEntity>('sort', sortSchema, 'sorts');

export { sortModel };
