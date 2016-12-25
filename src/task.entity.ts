import { ProjectEntity } from './project.entity';

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
