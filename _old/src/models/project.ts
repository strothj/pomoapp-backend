import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;
import { IUserIdentity } from './user';

/**
 *
 *
 * @interface IProject
 */
interface IProject extends IUserIdentity {
  name: string;
  favorited: boolean;
  archived: boolean;
}

interface IProjectDocument extends IProject, mongoose.Document {}

type ProjectSchemaDefinition = {
  [P in keyof IProject]: mongoose.SchemaDefinition[P]
};

const projectSchemaDefinition: ProjectSchemaDefinition = {
  user_id: { type: String, required: true },
  name: { type: String, required: true },
  favorited: { type: Boolean, required: true },
  archived: { type: Boolean, required: true }
};

const projectSchema = new Schema(projectSchemaDefinition);

// tslint:disable-next-line:variable-name
const Project = mongoose.model<IProjectDocument>('project', projectSchema, 'projects');

export { IProject, IProjectDocument, Project };
