import { UpdateEventDto } from '../../dtos';
import { EventEntity } from '../../entity/event.entity';
import { EventRepository } from '../../repositories/event.repository';

export interface UpdateEventUseCase {
  execute(dto: UpdateEventDto): Promise<EventEntity>;
}

export class UpdateEvent implements UpdateEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  execute(dto: UpdateEventDto): Promise<EventEntity> {
    return this.repository.updateById(dto);
  }
}
