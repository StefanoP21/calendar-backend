import { LoginUserDto } from '../../dtos';
import { UserEntity } from '../../entity/user.entity';
import { AuthRepository } from '../../repositories/auth.repository';

interface LoginUserUseCase {
  execute(dto: LoginUserDto): Promise<UserEntity>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly repsotory: AuthRepository) {}

  execute(dto: LoginUserDto): Promise<UserEntity> {
    return this.repsotory.login(dto);
  }
}
