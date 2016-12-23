import * as mongoose from 'mongoose';
import { BaseSchema } from '../shared';
import { Project } from './project.entity';

const projectSchemaDefinition: BaseSchema<Project> = {
  archived: { required: true, type: Boolean },
  favorited: { required: true, type: Boolean },
  id: { required: true, type: String },
  name: { required: true, type: String },
};

const projectSchema = new mongoose.Schema(projectSchemaDefinition);

export { projectSchema };
