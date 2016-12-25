/**
 * 
 */
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { AuthenticationService } from '../core';
import { Entity } from './entity';
import { Document, Model } from './model';

class Routes<T extends Entity> {
  private readonly user: (req: express.Request) => string;
  private readonly model: mongoose.Model<Document<T>>;

  constructor(auth: AuthenticationService, model: Model<T>) {
    this.user = auth.user;
    this.model = model.model;
  }

  private getAll: express.Handler = async (req, res, next) => {
    try {
      const user = this.user(req);
      const found = await this.model.find({ user }).exec();
      res.status(200).json(found);
    } catch (err) { next(err); }
  }

  private add: express.Handler = async (req, res, next) => {
    try {
      const user = this.user(req);
      const newItem = <T>req.body;
      newItem.user = user;
      const addedItem = await this.model.create(newItem);
      res.status(201).send(addedItem);
    } catch (err) {
      next(err);
    }
  }

  private edit: express.Handler = async (req, res, next) => {
    try {
      const user = this.user(req);
      const update = <T>req.body;
      await this.model.update({ user, _id: req.params.itemId }, update);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  private del: express.Handler = async (req, res, next) => {
    try {
      const user = this.user(req);
      await this.model.remove({ user, _id: req.params.itemId });
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  }

  public router(): express.Router {
    const router = express.Router();
    router.use('/', bodyParser.json());
    router.get('/', this.getAll);
    router.put('/:itemId', this.edit);
    router.delete('/:itemId', this.del);
    router.post('/', this.add);
    return router;
  }
}

export { Routes };
