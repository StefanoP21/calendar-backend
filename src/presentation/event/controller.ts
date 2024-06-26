import { Request, Response } from 'express';
import {
  CreateEvent,
  CreateEventDto,
  DeleteEvent,
  EventRepository,
  GetEvent,
  GetEvents,
  UpdateEvent,
  UpdateEventDto,
} from '../../domain';

export class EventController {
  constructor(private readonly eventRepository: EventRepository) {}

  public getEvents(req: Request, res: Response) {
    new GetEvents(this.eventRepository)
      .execute()
      .then((events) =>
        res.status(200).json({
          ok: true,
          events,
        })
      )
      .catch((error) =>
        res.status(404).json({
          ok: false,
          msg: error,
        })
      );
  }

  public getEventById(req: Request, res: Response) {
    const id = req.params.id;

    new GetEvent(this.eventRepository)
      .execute(id)
      .then((event) =>
        res.status(200).json({
          ok: true,
          event,
        })
      )
      .catch((error) =>
        res.status(404).json({
          ok: false,
          msg: error,
        })
      );
  }

  public createEvent(req: Request, res: Response) {
    const [error, createEventDto] = CreateEventDto.create(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    new CreateEvent(this.eventRepository)
      .execute(createEventDto!)
      .then((newEvent) =>
        res.status(200).json({
          ok: true,
          event: newEvent,
        })
      )
      .catch((error) =>
        res.status(400).json({
          ok: false,
          msg: error,
        })
      );
  }

  public updateEvent(req: Request, res: Response) {
    const id = req.params.id;
    const [error, updatedEventDto] = UpdateEventDto.update({
      ...req.body,
      id,
    });

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    new UpdateEvent(this.eventRepository)
      .execute(updatedEventDto!)
      .then((updatedEvent) =>
        res.status(200).json({
          ok: true,
          event: updatedEvent,
        })
      )
      .catch((error) =>
        res.status(404).json({
          ok: false,
          msg: error,
        })
      );
  }

  public deleteEvent(req: Request, res: Response) {
    const id = req.params.id;

    new DeleteEvent(this.eventRepository)
      .execute(id)
      .then((deletedEvent) =>
        res.status(200).json({
          ok: true,
          event: deletedEvent,
        })
      )
      .catch((error) =>
        res.status(404).json({
          ok: false,
          msg: error,
        })
      );
  }
}
