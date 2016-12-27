import * as mongoose from 'mongoose';
import { modelFactory } from '../shared';
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
const projectModel = modelFactory<ProjectEntity>('project', projectSchema, 'projects');

/* tslint:disable:no-invalid-this */
// Remove tasks belonging to the project being removed.
projectModel.schema.pre('remove', function(next: any) {
  const taskModel = mongoose.model('task');
  taskModel.remove({ user: this.user, projectId: this._id }).exec()
    .then(next)
    .catch((reason) => {
      next(new Error(reason));
    });
});

// Remove sortings belonging to the project being removed.
projectModel.schema.pre('remove', function(next: any) {
  const sortModel = mongoose.model('sort');
  sortModel.remove({ user: this.user, target: this._id }).exec()
    .then(next)
    .catch((reason) => {
      next(new Error(reason))
    });
});
/* tslint:enable:no-invalid-this */

export { projectModel, projectSchema };
