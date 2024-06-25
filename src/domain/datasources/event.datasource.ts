import { CreateEventDto, UpdateEventDto } from '../dtos';
import { EventEntity } from '../entity/event.entity';

export abstract class EventDatasource {
  abstract create(createEventDto: CreateEventDto): Promise<EventEntity>;

  abstract getAll(): Promise<EventEntity[]>;

  abstract findById(id: string): Promise<EventEntity>;

  abstract updateById(updateEventDto: UpdateEventDto): Promise<EventEntity>;

  abstract deleteById(id: string): Promise<EventEntity>;
}
