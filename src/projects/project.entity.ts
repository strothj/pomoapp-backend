/**
 * Project entity.
 * 
 * @class Project
 */
class Project {
  public id?: string;
  public name: string;
  public favorited: boolean;
  public archived: boolean;
  public user?: string;
}

export { Project };
