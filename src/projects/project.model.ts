import * as mongoose from 'mongoose';
import { Model } from '../shared';
import { ProjectEntity } from '.';

const projectSchema: mongoose.SchemaDefinition = {
  user: { required: true, type: String },
  name: { required: true, type: String },
  favorited: { required: true, type: Boolean },
  archived: { required: true, type: Boolean }
};

/**
 * Project model.
 */
const projectModel = new Model<ProjectEntity>('project', projectSchema, 'projects');

// Remove tasks belonging to the project being removed.
projectModel.model.schema.pre('remove', function(next: any) {
  const taskModel = mongoose.model('task');
  taskModel.remove({ user: this.user, projectId: this._id }).exec() // tslint:disable-line
    .then(next)
    .catch((reason) => {
      next(new Error(reason));
    });
});

export { projectModel, projectSchema };
