import jwt from 'jsonwebtoken';

export class JwtAdapter {
  constructor(public readonly seed: string) {}

  async generateToken(payload: any, duration: string = '2h') {
    return new Promise((resolve) => {
      jwt.sign(payload, this.seed, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  async validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, this.seed, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  }
}
