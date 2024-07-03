import { RenewUserDto } from '../../dtos';
import { UserEntity } from '../../entity/user.entity';
import { AuthRepository } from '../../repositories/auth.repository';

interface RenewTokenUseCase {
  execute(dto: RenewUserDto): Promise<UserEntity>;
}

export class RenewToken implements RenewTokenUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(dto: RenewUserDto): Promise<UserEntity> {
    return this.repository.renew(dto);
  }
}
