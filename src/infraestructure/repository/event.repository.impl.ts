import {
  CreateEventDto,
  EventDatasource,
  EventEntity,
  EventRepository,
  UpdateEventDto,
} from '../../domain';

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly datasource: EventDatasource) {}

  create(createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.datasource.create(createEventDto);
  }

  getAll(): Promise<EventEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: string): Promise<EventEntity> {
    return this.datasource.findById(id);
  }

  updateById(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    return this.datasource.updateById(updateEventDto);
  }

  deleteById(id: string): Promise<EventEntity> {
    return this.datasource.deleteById(id);
  }
}
