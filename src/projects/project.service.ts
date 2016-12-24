import { RepositoryBase } from '../shared';
import { ProjectDocument, projectModel } from './project.model';

/**
 * Provides services for manipulating projects.
 * 
 * @class ProjectService
 */
class ProjectService {
  private repo: RepositoryBase<ProjectDocument> = new RepositoryBase<ProjectDocument>(projectModel);
}

export { ProjectService };
