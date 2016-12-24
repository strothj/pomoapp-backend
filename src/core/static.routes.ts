import * as express from 'express';
import { StaticConfig } from './static.config';

/**
 * Serves static assets and main frontend html.
 * 
 * @class StaticRoutes
 */
class StaticRoutes {
  constructor(private readonly config: StaticConfig) {}

  public index: express.Handler = (req, res) => {
    res.sendFile(this.config.staticIndex);
  }

  public routes(): express.Router {
    const router = express.Router();
    router.use('/static', express.static(this.config.staticAssets));
    router.get('*', this.index);
    return router;
  }
}

export { StaticRoutes };
