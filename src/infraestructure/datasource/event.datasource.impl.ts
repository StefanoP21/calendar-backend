import { EventModel } from '../../data/mongodb';
import {
  CreateEventDto,
  EventDatasource,
  EventEntity,
  UpdateEventDto,
} from '../../domain';

export class EventDatasourceImpl implements EventDatasource {
  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const newEvent = await EventModel.create(createEventDto);

    return EventEntity.fromObject(newEvent);
  }

  async getAll(): Promise<EventEntity[]> {
    const events = await EventModel.find().populate('user', 'name');

    return events.map((event) => EventEntity.fromObject(event));
  }

  async findById(id: string): Promise<EventEntity> {
    const event = await EventModel.findById(id);

    if (!event) throw `Event with id ${id} not found`;

    return EventEntity.fromObject(event);
  }

  async updateById(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    await this.findById(updateEventDto.id);

    const updatedEvent = await EventModel.findByIdAndUpdate(
      updateEventDto.id,
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