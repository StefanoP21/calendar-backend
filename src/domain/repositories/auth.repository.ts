import { LoginUserDto, RegisterUserDto, RenewUserDto } from '../dtos';
import { UserEntity } from '../entity/user.entity';

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract renew(renewUserDto: RenewUserDto): Promise<UserEntity>;
}
