/**
 * Model module.
 *
 * @module service/model
 */
import * as mongoose from 'mongoose';
import { IUserIdentity } from './userIdentity';

type Document<T> = T & IUserIdentity;

type MongoDocument<T> = Document<T> & mongoose.Document;

/**
 * Wraps a constructed MongoDB model.
 *
 * @class Model
 * @template T
 */
class Model<T extends IUserIdentity> {
  public readonly model: mongoose.Model<MongoDocument<T>>;

  /**
   * Constructs a MongoDB model using an instantiated object.
   * It creates a schema with all fields set as required.
   *
   * @constructs Model
   * @param base An instantiated object of the type of the Model.
   * @param name Name of MongoDB document.
   * @param collection The MongoDB collection the documents will belong to.
   */
  constructor(public readonly base: T, name: string, collection: string) {
    if (!base) { throw new Error('Cannot be null "base"'); }
    this.model = null;

    const schemaDefinition: mongoose.SchemaDefinition = {};
    Object.keys(<any>base).forEach((p) => {
      schemaDefinition[p] = { type: typeof p, required: true };
    });
    const schema = new mongoose.Schema(schemaDefinition);
    this.model = mongoose.model<MongoDocument<T>>(name, schema, collection);
  }
}

export { Document, MongoDocument, Model };
