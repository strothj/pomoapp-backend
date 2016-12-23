import { RepositoryBase } from '../shared';
import { ProjectDocument, projectModel } from './project.model';

class ProjectService {
  private repo = new RepositoryBase<ProjectDocument>(projectModel);
}

export { ProjectService };
