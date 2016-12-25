import * as mongoose from 'mongoose';
import { Entity } from './entity';

type Document<T> = T & mongoose.Document;

/**
 * Mongoose model with preset transforms and save hook.
 * 
 * @class Model
 * @template T
 */
class Model<T extends Entity> {
  public readonly model: mongoose.Model<Document<T>>;

  constructor(name: string, schema: mongoose.SchemaDefinition, collection?: string) {
    const mongooseSchema = new mongoose.Schema(schema);

    // Remove MongoDB fields before returning response to user.
    const transformOptions: mongoose.DocumentToObjectOptions = {
      transform: (doc: Document<T>, ret: Entity & mongoose.Document) => {
        delete ret._id;
        delete ret.__v;
        delete ret.user;
        ret.id = doc._id;
        return ret;
      }
    };
    mongooseSchema.set('toJSON', transformOptions);

    // Make sure items can only be saved if they are associated with a user account.
    // Remove id field, it is added in the toJSON method.
    mongooseSchema.pre('save', function(next: (err?: mongoose.NativeError) => void) {
      if (this._doc) {
        const item: Document<T> = this._doc;
        if (item.id) { delete item.id; }
        if (!item.user) { next(new Error('No user account attached to item')); return; }
      }
      next();
    });

    this.model = mongoose.model<Document<T>>(name, mongooseSchema, collection);
  }
}

export { Document, Model };
