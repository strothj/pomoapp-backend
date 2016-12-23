import * as mongoose from 'mongoose';
import { Project } from './project.entity';
import { projectSchema } from './project.schema';

interface ProjectDocument extends Project, mongoose.Document {}

const projectModel = mongoose.model<ProjectDocument>('project', projectSchema, 'projects');

export { ProjectDocument, projectModel };
