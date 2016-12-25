import * as mongoose from 'mongoose';
import { Model } from './shared';
import { ProjectEntity } from './project.entity';

const schema: mongoose.SchemaDefinition = {
  user: { required: true, type: String },
  name: { required: true, type: String },
  favorited: { required: true, type: Boolean },
  archived: { required: true, type: Boolean }
};

/**
 * Project model.
 */
const projectModel = new Model<ProjectEntity>('project', schema, 'projects');

export { projectModel };
