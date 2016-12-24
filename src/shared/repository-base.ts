import * as mongoose from 'mongoose';

/**
 * Wrapper around Mongoose model.
 * 
 * @class RepositoryBase
 * @template T
 */
abstract class RepositoryBase<T extends mongoose.Document> {
  constructor(private readonly model: mongoose.Model<mongoose.Document>) {
  }

  public create(doc: Object): Promise<T> {
    return this.model.create(doc);
  }

  public find(conditions: Object): Promise<T[]> {
    return this.model.find(conditions).exec();
  }

  public findBy(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  public findOne(conditions: Object): Promise<T> {
    return this.model.findOne(conditions).exec();
  }

  public remove(conditions: Object): Promise<void> {
    return this.model.remove(conditions).exec();
  }

  public update(conditions: Object, doc: T): Promise<void> {
    return this.model.update(conditions, doc).exec();
  }

  public abstract stripMongoFields(itemDoc: T): Object;
}

export { RepositoryBase };
