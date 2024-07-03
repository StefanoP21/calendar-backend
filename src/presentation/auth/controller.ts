import { Request, Response } from 'express';
import {
  AuthRepository,
  AuthRequest,
  CustomError,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
  RenewToken,
  RenewUserDto,
} from '../../domain';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (res: Response, error: unknown) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        ok: false,
        msg: error.message,
      });
    }

    return res.status(500).json({
      ok: false,
      msg: `Internal server error: ${error}`,
    });
  };

  public registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.register(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((user) =>
        res.status(200).json({
          ok: true,
          uid: user.id,
          name: user.name,
          token: user.token,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public loginUser = (req: Request, res: Response) => {
    const [error, loginuserDto] = LoginUserDto.login(req.body);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    new LoginUser(this.authRepository)
      .execute(loginuserDto!)
      .then((user) =>
        res.status(200).json({
          ok: true,
          uid: user.id,
          name: user.name,
          token: user.token,
        })
      )
      .catch((error) => this.handleError(res, error));
  };

  public renewToken = (req: AuthRequest, res: Response) => {
    const [error, renewUserDto] = RenewUserDto.renew(req);

    if (error) {
      return res.status(400).json({
        ok: false,
        msg: error,
      });
    }

    new RenewToken(this.authRepository)
      .execute(renewUserDto!)
      .then((user) => {
        res.status(200).json({
          ok: true,
          uid: user.id,
          name: user.name,
          token: user.token,
        });
      })
      .catch((error) => this.handleError(res, error));
  };
}
