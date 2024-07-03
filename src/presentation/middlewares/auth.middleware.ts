import { NextFunction, Response } from 'express';
import { Envs, JwtAdapter } from '../../config';
import { AuthRequest } from '../../domain';

export class AuthMiddleware {
  static async validateJwt(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.header('x-token');

    if (!token)
      return res.status(401).json({
        ok: false,
        msg: 'No token provided',
      });

    try {
      const jwtAdapter = new JwtAdapter(Envs.secretJwtSeed());
      const payload = await jwtAdapter.validateToken<{
        id: string;
        name: string;
      }>(token);

      if (!payload)
        return res.status(401).json({
          ok: false,
          msg: 'Invalid token',
        });

      req.uid = payload.id;
      req.name = payload.name;

      next();
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: `Internal server error: ${error}`,
      });
    }
  }
}
