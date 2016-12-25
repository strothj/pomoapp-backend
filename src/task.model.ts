import * as mongoose from 'mongoose';
import { Model } from './shared';
import { projectSchema } from './project.model';
import { TaskEntity } from './task.entity';

const taskSchema: mongoose.SchemaDefinition = {
  ...projectSchema,
  projectId: { required: true, type: String }
}

/**
 * Task model.
 */
const taskModel = new Model<TaskEntity>('task', taskSchema, 'tasks');

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
