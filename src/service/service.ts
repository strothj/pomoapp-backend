/**
 *
 */
import * as mongoose from 'mongoose';
import * as express from 'express';
import { IUserIdentity } from './userIdentity';
import { IUserAccountReader } from './authentication';
import { MongoDocument, Model } from './model';

class Service<T extends IUserIdentity> {
  private readonly model: mongoose.Model<MongoDocument<T>>;
  private readonly base: T;

  constructor(model: Model<T>, private readonly account: IUserAccountReader) {
    this.model = model.model;
    this.base = model.base;
  }

  public findOne(): express.Handler {
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

  public createOne(): express.Handler {
    return async (req, res, next) => {
      try {
        const account = this.account(req);
        const item = this.removeMongoFields(req.body);
        item.user_id = account;
        const existing = await this.model.findOne({ user_id: account}).exec();
        if (existing) {
          res.sendStatus(403);
          return;
        }
      } catch (err) {
        next(err);
      }
    };
  }

  private removeMongoFields(obj: MongoDocument<T>): T {
    const newObj = <T>{};
    Object.keys(this.base).forEach((key) => {
      if (key === 'user_id') { return; }
      newObj[key] = obj[key];
    });
    return newObj;
  }
}

export { Service };
