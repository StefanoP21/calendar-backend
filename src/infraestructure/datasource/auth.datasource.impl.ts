import { BcryptAdapter, Envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  RenewUserDto,
  UserEntity,
} from '../../domain';

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(registerUserDto);

      //* encrypt password
      user.password = BcryptAdapter.hash(registerUserDto.password);

      await user.save();

      //* jwt
      const jwtAdapter = new JwtAdapter(Envs.secretJwtSeed());
      const token = (await jwtAdapter.generateToken({
        id: user.id,
        name: user.name,
      })) as string;

      if (!token)
        throw CustomError.internalServerError('Error while generating token');

      const { password, ...userEntity } = UserEntity.fromObject(user);

      userEntity.token = token;

      return userEntity;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.notFound('Email not exist');

    const passswordIsValid = BcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!passswordIsValid) throw CustomError.unauthorized('Incorrect password');
    const { password, ...userEntity } = UserEntity.fromObject(user);

    //* jwt
    const jwtAdapter = new JwtAdapter(Envs.secretJwtSeed());
    const token = (await jwtAdapter.generateToken({
      id: user.id,
      name: user.name,
    })) as string;

    if (!token)
      throw CustomError.internalServerError('Error while generating token');

    userEntity.token = token;

    return userEntity;
  }

  async renew(renewUserDto: RenewUserDto): Promise<UserEntity> {
    const { uid, name } = renewUserDto;

    const user = await UserModel.findById(uid);
    if (!user) throw CustomError.notFound('Invalid token');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    //* jwt
    const jwtAdapter = new JwtAdapter(Envs.secretJwtSeed());
    const token = (await jwtAdapter.generateToken({
      id: uid,
      name,
    })) as string;

    if (!token)
      throw CustomError.internalServerError('Error while generating token');

    userEntity.token = token;

    return userEntity;
  }
}
