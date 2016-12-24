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
    const app = express.Router();
    app.use('/static', express.static(this.config.staticAssets));
    app.get('*', this.index);
    return app;
  }
}

export { StaticRoutes };
