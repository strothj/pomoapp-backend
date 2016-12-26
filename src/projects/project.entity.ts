import { Entity } from '../shared';

/**
 * Project entity
 * 
 * @interface ProjectEntity
 * @extends {Entity}
 */
interface ProjectEntity extends Entity {
  name: string;
  favorited: boolean;
  archived: boolean;
}

export { ProjectEntity };
