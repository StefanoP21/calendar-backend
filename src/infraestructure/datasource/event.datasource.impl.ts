import { EventModel } from '../../data';
import {
  CreateEventDto,
  CustomError,
  EventDatasource,
  EventEntity,
  UpdateEventDto,
} from '../../domain';

export class EventDatasourceImpl implements EventDatasource {
  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    try {
      const newEvent = await EventModel.create(createEventDto);

      return EventEntity.fromObject(newEvent);
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getAll(): Promise<EventEntity[]> {
    const events = await EventModel.find().populate('user', 'name');

    if (events.length < 1) {
      throw CustomError.notFound('Events not found on database');
    }

    return events.map((event) => EventEntity.fromObject(event));
  }

  async findById(id: string): Promise<EventEntity> {
    const event = await EventModel.findById(id);

    if (!event) throw CustomError.badRequest(`Event with id ${id} not found`);

    return EventEntity.fromObject(event);
  }

  async updateById(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    const event = await this.findById(updateEventDto.id);

    const updatedEvent = await EventModel.findByIdAndUpdate(
      event.id,
      updateEventDto,
      {
        new: true,
      }
    ).populate('user', 'name');

    return EventEntity.fromObject(updatedEvent!);
  }

  async deleteById(id: string): Promise<EventEntity> {
    await this.findById(id);

    const deletedEvent = await EventModel.findByIdAndDelete(id);

    return EventEntity.fromObject(deletedEvent!);
  }
}
