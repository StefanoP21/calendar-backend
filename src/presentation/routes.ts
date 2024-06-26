import { Router } from 'express';
import { EventRoutes } from './event/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/events', EventRoutes.routes);

    return router;
  }
}
