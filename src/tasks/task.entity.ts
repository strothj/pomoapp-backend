import { ProjectEntity } from '../projects';

/**
 * Task entity.
 * 
 * @interface TaskEntity
 * @extends {ProjectEntity}
 */
interface TaskEntity extends ProjectEntity {
  projectId: string;
}

export { TaskEntity };
