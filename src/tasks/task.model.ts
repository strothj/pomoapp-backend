import * as mongoose from 'mongoose';
import { Model } from '../shared';
import { projectSchema } from '../projects';
import { TaskEntity } from '.';

const taskSchema: mongoose.SchemaDefinition = {
  ...projectSchema,
  projectId: { required: true, type: String }
}

/**
 * Task model.
 */
const taskModel = new Model<TaskEntity>('task', taskSchema, 'tasks');

// Do not allow adding tasks to a project that does not exist.
taskModel.model.schema.pre('save', function(next: any) {
  const projectModel = mongoose.model('project');
  projectModel.findOne({ user: this.user, _id: this.projectId }).exec() // tslint:disable-line
    .then((val) => {
      if (val) {
        next();
      } else { next(new Error('Project does not exist')); }
    })
    .catch((reason) => {
      next(new Error(reason));
    });
});

export { taskModel };
