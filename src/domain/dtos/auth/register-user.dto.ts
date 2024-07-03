import { RegExp } from '../../../config';

export class RegisterUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static register(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ['Name property is required', undefined];
    if (!email) return ['Email property is required', undefined];
    if (!RegExp.email().test(email))
      return ['Email property is not valid', undefined];
    if (!password) return ['Password property is required', undefined];
    if (password.length < 6)
      return ['Password property should have 6 characters', undefined];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
