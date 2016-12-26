import { AuthenticationService } from '../core';
import { Routes } from '../shared';
import { SortEntity, sortModel } from '.';

/**
 * Sorts Express routes.
 * 
 * @class SortRoutes
 * @extends {Routes<SortEntity>}
 */
class SortRoutes extends Routes<SortEntity> {
  constructor(auth: AuthenticationService) {
    super(auth, sortModel);
  }
}

export { SortRoutes };
