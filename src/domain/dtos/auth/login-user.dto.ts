import { RegExp } from '../../../config';

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['Email property is required', undefined];
    if (!RegExp.email().test(email))
      return ['Email property is not valid', undefined];
    if (!password) return ['Password property is required', undefined];
    if (password.length < 6)
      return ['Password property should have 6 characters', undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
