import { Router } from 'express';
import {
  EventDatasourceImpl,
  EventRepositoryImpl,
} from '../../infraestructure';
import { EventController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class EventRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new EventDatasourceImpl();
    const eventRepository = new EventRepositoryImpl(datasource);

    const eventController = new EventController(eventRepository);

    router.use(AuthMiddleware.validateJwt as any);

    router.get('/', eventController.getEvents);
    router.get('/:id', eventController.getEventById);

    router.post('/new', eventController.createEvent);
    router.put(
      '/:id',
      [AuthMiddleware.validateUser as any],
      eventController.updateEvent
    );
    router.delete(
      '/:id',
      [AuthMiddleware.validateUser as any],
      eventController.deleteEvent
    );

    return router;
  }
}
