import * as mongoose from 'mongoose';
import { Schema } from '../shared';
import { Project } from './project.entity';

const projectSchemaDefinition: Schema<Project> = {
  archived: { required: true, type: Boolean },
  favorited: { required: true, type: Boolean },
  id: { type: String },
  name: { required: true, type: String }
};

const projectSchema = new mongoose.Schema(projectSchemaDefinition);

interface ProjectDocument extends Project, mongoose.Document {}

/**
 * Project MongoDB model.
 */
const projectModel = mongoose.model<ProjectDocument>('project', projectSchema, 'projects');

export { ProjectDocument, projectModel };
