import { Router } from 'express';
import { EventRoutes } from './event/routes';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/events', EventRoutes.routes);
    router.use('/api/auth', AuthRoutes.routes);

    return router;
  }
}
