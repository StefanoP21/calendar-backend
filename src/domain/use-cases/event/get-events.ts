import { EventEntity } from '../../entity/event.entity';
import { EventRepository } from '../../repositories/event.repository';

interface GetEventsUseCase {
  execute(): Promise<EventEntity[]>;
}

export class GetEvents implements GetEventsUseCase {
  constructor(private readonly repository: EventRepository) {}

  execute(): Promise<EventEntity[]> {
    return this.repository.getAll();
  }
}
