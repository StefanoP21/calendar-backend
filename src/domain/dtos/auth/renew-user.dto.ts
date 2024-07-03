import { Request } from 'express';

export interface AuthRequest extends Request {
  uid: string;
  name: string;
}

export class RenewUserDto {
  constructor(public readonly uid: string, public readonly name: string) {}

  static renew(req: AuthRequest): [string?, RenewUserDto?] {
    const { uid, name } = req;

    if (!uid) return ['UID property is required', undefined];
    if (!name) return ['Name property is required', undefined];

    return [undefined, new RenewUserDto(uid, name)];
  }
}
