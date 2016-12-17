import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;
// import { IUserIdentity } from './user';

/**
 *
 *
 * @interface IProject
 */
interface IProject {
  user_id: string;
  name: string;
  favorited: boolean;
  archived: boolean;
}

interface IProjectDocument extends IProject, mongoose.Document {}

type ProjectSchemaDefinition = {
  [P in keyof IProject]: mongoose.SchemaDefinition[P]
};

const schemaDefinition: ProjectSchemaDefinition = {
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  favorited: {
    type: Boolean,
    required: true
  },
  archived: {
    type: Boolean,
    required: true
  }
};

const projectSchema = new Schema(schemaDefinition);

// tslint:disable-next-line variable-name
const Project = mongoose.model<IProjectDocument>('project', projectSchema, 'projects');

export { IProject, IProjectDocument, Project };
