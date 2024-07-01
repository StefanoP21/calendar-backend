import { CustomError } from '../errors/custom-error';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public token: string,
    public password?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, password, token } = object;

    if (!id && _id) throw CustomError.badRequest('Id property is required');
    if (!name) throw CustomError.badRequest('Name property is required');
    if (!email) throw CustomError.badRequest('Email property is required');
    if (!password)
      throw CustomError.badRequest('Password property is required');

    return new UserEntity(_id || id, name, email, password, token);
  }
}
