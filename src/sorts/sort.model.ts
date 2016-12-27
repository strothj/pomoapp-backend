import * as mongoose from 'mongoose';
import { modelFactory } from '../shared';
import { SortEntity } from '.';

const sortSchema: mongoose.SchemaDefinition = {
  user: { required: true, type: String },
  target: { required: true, type: String },
  sort: { required: true, type: String }
};

/**
 * Sort model.
 */
const sortModel = modelFactory<SortEntity>('sort', sortSchema, 'sorts');

sortModel.schema.pre('save', function(next: any) {
  /* tslint:disable:no-invalid-this */

  // Enforce only a single sorting targeting the "projects" and "favorites" listings.
  if (this.target === 'projects' || this.target === 'favorites') {
    if (this.isNew) {
      sortModel.findOne({ user: this.user, target: this.target }).exec()
        .then((val) => {
          if (val) {
            next(new Error('Cannot have multiple of this sorting type'));
          } else {
            next();
          }
        });
    } else { next(); }

  // Do not allow adding a sorting that references a project that does not exist.
  } else {
    const projectModel = mongoose.model('project');
    projectModel.findOne({ user: this.user, _id: this.target }).exec()
      .then((val) => {
        if (val) {
          next();
        } else { next(new Error('Project does not exist')); }
      })
      .catch((reason) => {
        next(new Error(reason));
      });
  }
});

export { sortModel };
