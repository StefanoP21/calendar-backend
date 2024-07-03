import { RegisterUserDto } from '../../dtos';
import { UserEntity } from '../../entity/user.entity';
import { AuthRepository } from '../../repositories/auth.repository';

interface RegisterUserUseCase {
  execute(dto: RegisterUserDto): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(dto: RegisterUserDto): Promise<UserEntity> {
    return this.repository.register(dto);
  }
}
