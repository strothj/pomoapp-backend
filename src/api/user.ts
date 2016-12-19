/**
 * User API module.
 *
 * @module api/user
 */
import * as express from 'express';
import { IUser, User } from '../models/user';
import { RequestWithIdentity } from './types';

const userApp: express.Express = express();

userApp.get('/', (req: RequestWithIdentity, res, next) => {
  User.findOne({ user_id: req.user.user_id })
    .then((user) => {
      if (!user) {
        res.sendStatus(404);
        return;
      }
      const userResp: Partial<IUser> = { lastHref: user.lastHref };
      res.json(userResp);
    })
    .catch(next);
});

userApp.put('/', (req: RequestWithIdentity, res, next) => {
  if (!req.body) { req.body = {}; }
  const newUser: IUser = {
    user_id: req.user.user_id,
    lastHref: req.body.lastHref ? <string>req.body.lastHref : ''
  };
  User.findOneAndUpdate({ user_id: req.user.user_id }, newUser, { upsert: true })
    .exec()
    .then(() => {
      const createdUser: Partial<IUser> = { lastHref: newUser.lastHref };
      res.json(createdUser);
    })
    .catch(next);
});

export { userApp };
