import { EventEntity } from '../../entity/event.entity';
import { EventRepository } from '../../repositories/event.repository';

export interface GetEventUseCase {
  execute(id: string): Promise<EventEntity>;
}

export class GetEvent implements GetEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  execute(id: string): Promise<EventEntity> {
    return this.repository.findById(id);
  }
}
