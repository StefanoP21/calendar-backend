import 'dotenv/config';
import { get } from 'env-var';

export class Envs {
  static port() {
    return get('PORT').required().asPortNumber();
  }

  static publicPath() {
    return get('PUBLIC_PATH').default('public').asString();
  }

  static mongoUrl() {
    return get('DB_CNN').required().asString();
  }

  static dbName() {
    return get('DB_NAME').required().asString();
  }

  static secretJwtSeed() {
    return get('SECRET_JWT_SEED').required().asString();
  }
}
