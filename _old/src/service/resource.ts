/**
 * Provides Express request handlers for database resources.
 *
 * @module service/resource
 */
import * as mongoose from 'mongoose';
import * as express from 'express';
import { IUserIdentity } from './userIdentity';
import { IUserAccountReader } from './authentication';
import { MongoDocument, Model } from './model';

abstract class ResourceBase<T extends IUserIdentity> {
  protected readonly model: mongoose.Model<MongoDocument<T>>;
  protected readonly base: T;
  protected readonly account: IUserAccountReader;

  constructor(model: Model<T>, account: IUserAccountReader) {
    this.model = model.model;
    this.base = model.base;
    this.account = account;
  }

  protected removeMongoFields(obj: MongoDocument<T>, addId?: boolean): T {
    const newObj = <T>{};
    Object.keys(this.base).forEach((key) => {
      if (key === 'user_id') { return; }
      newObj[key] = obj[key];
    });
    if (addId) { (<any>newObj).id = obj._id; }
    return newObj;
  }
}

class SingleItemResource<T extends IUserIdentity> extends ResourceBase<T> {
  constructor(model: Model<T>, account: IUserAccountReader) {
    super(model, account);
  }

  public read(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        const item = await this.model.findOne({ user_id: account }).exec();
        if (!item) { res.sendStatus(404); return; }
        res.json(this.removeMongoFields(item));
      } catch (err) {
        next(err);
      }
    };
  }

  public create(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        const item = this.removeMongoFields(req.body);
        item.user_id = account;
        const existing = await this.model.findOne({ user_id: account }).exec();
        if (existing) { res.sendStatus(403); return; }
        const created = await this.model.create(item);
        res.status(201).json(this.removeMongoFields(created));
      } catch (err) {
        next(err);
      }
    };
  }

  public update(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        const newItem = this.removeMongoFields(req.body);
        newItem.user_id = this.account(req);
        const item = await this.model.findOneAndUpdate({ user_id: account }, newItem).exec();
        if (!item) { res.sendStatus(403); return; }
        res.status(200).json(this.removeMongoFields(item));
      } catch (err) {
        next(err);
      }
    };
  }

  public del(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        await this.model.remove({ user_id: account }).exec();
        res.sendStatus(204);
      } catch (err) {
        next(err);
      }
    };
  }
}

interface IItemWithID {
  id: string;
}

type ItemWithID<T> = T & IItemWithID;

class MultiItemResource<T extends IUserIdentity> extends ResourceBase<T> {
  constructor(model: Model<T>, account: IUserAccountReader) {
    super(model, account);
  }

  public readAll(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        const items = await this.model.find({ user_id: account }).exec();
        res.status(200).json(this.removeMongoFieldsFromArray(items));
      } catch (err) {
        next(err);
      }
    };
  }

  public create(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        const newItem = this.removeMongoFields(req.body);
        newItem.user_id = account;
        const addedItem = await this.model.create(newItem);
        res.status(201).json(this.removeMongoFieldsAttachId(addedItem));
      } catch (err) {
        next(err);
      }
    };
  }

  private removeMongoFieldsAttachId(item: MongoDocument<T>): ItemWithID<T> {
    const id = item._id;
    const itemWithID = <ItemWithID<T>>this.removeMongoFields(item);
    itemWithID.id = id;
    return itemWithID;
  }

  private removeMongoFieldsFromArray(objs: MongoDocument<T>[]): T[] {
    const newItems: any[] = [];
    objs.forEach((item) => {
      newItems.push(this.removeMongoFields(item, true));
    });
    return newItems;
  }
}

export { ResourceBase, SingleItemResource, MultiItemResource };
