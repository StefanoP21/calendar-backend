import { LoginUserDto, RegisterUserDto } from '../dtos';
import { UserEntity } from '../entity/user.entity';

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
