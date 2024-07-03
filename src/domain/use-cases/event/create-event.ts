import { CreateEventDto } from '../../dtos';
import { EventEntity } from '../../entity/event.entity';
import { EventRepository } from '../../repositories/event.repository';

interface CreateEventUseCase {
  execute(dto: CreateEventDto): Promise<EventEntity>;
}

export class CreateEvent implements CreateEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  execute(dto: CreateEventDto): Promise<EventEntity> {
    return this.repository.create(dto);
  }
}
