import { Entity } from '../shared';

/**
 * Sort entity
 * 
 * @interface SortEntity
 * @extends {Entity}
 */
interface SortEntity extends Entity {
  target: string;
  sort: string;
}

export { SortEntity };
