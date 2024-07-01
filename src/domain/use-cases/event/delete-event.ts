import { EventEntity } from '../../entity/event.entity';
import { EventRepository } from '../../repositories/event.repository';

interface DeleteEventUseCase {
  execute(id: string): Promise<EventEntity>;
}

export class DeleteEvent implements DeleteEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  execute(id: string): Promise<EventEntity> {
    return this.repository.deleteById(id);
  }
}
