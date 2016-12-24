import { RepositoryBase } from '../shared';
import { ProjectDocument, projectModel } from './project.model';
import { Project } from './project.entity';

/**
 * Provides services for manipulating projects.
 * 
 * @class ProjectService
 */
class ProjectService extends RepositoryBase<ProjectDocument> {
  constructor() {
    super(projectModel);
  }

  public stripMongoFields(itemDoc: ProjectDocument): Project {
    return {
      id: itemDoc._id,
      name: itemDoc.name,
      favorited: itemDoc.favorited,
      archived: itemDoc.archived
    };
  }
}

export { ProjectService };
