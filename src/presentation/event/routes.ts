import { Router } from 'express';
import {
  EventDatasourceImpl,
  EventRepositoryImpl,
} from '../../infraestructure';
import { EventController } from './controller';

export class EventRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new EventDatasourceImpl();
    const eventRepository = new EventRepositoryImpl(datasource);

    const eventController = new EventController(eventRepository);

    router.get('/', eventController.getEvents);
    router.get('/:id', eventController.getEventById);

    router.post('/new', eventController.createEvent);
    router.put('/:id', eventController.updateEvent);
    router.delete('/:id', eventController.deleteEvent);

    return router;
  }
}
