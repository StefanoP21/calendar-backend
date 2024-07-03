import { Request, Response } from 'express';
import {
  CreateEvent,
  CreateEventDto,
  CustomError,
  DeleteEvent,
  EventRepository,
  GetEvent,
  GetEvents,
  UpdateEvent,
  UpdateEventDto,
} from '../../domain';

export class EventController {
  constructor(private readonly eventRepository: EventRepository) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        ok: false,
        msg: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      msg: `Internal server error: ${error}`,
    });
  };

  public getEvents = (req: Request, res: Response) => {
    new GetEvents(this.eventRepository)
      .execute()
      .then((events) =>
        res.status(200).json({
          ok: true,
          events,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public getEventById = (req: Request, res: Response) => {
    const id = req.params.id;

    new GetEvent(this.eventRepository)
      .execute(id)
      .then((event) =>
        res.status(200).json({
          ok: true,
          event,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public createEvent = (req: Request, res: Response) => {
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
  };

  public updateEvent = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateEventDto] = UpdateEventDto.update({
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
      .execute(updateEventDto!)
      .then((updatedEvent) =>
        res.status(200).json({
          ok: true,
          event: updatedEvent,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public deleteEvent = (req: Request, res: Response) => {
    const id = req.params.id;

    new DeleteEvent(this.eventRepository)
      .execute(id)
      .then((deletedEvent) =>
        res.status(200).json({
          ok: true,
          event: deletedEvent,
        })
      )
      .catch((error) => this.handleError(res, error));
  };
}
