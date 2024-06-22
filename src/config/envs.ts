import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

  //* MongoDB
  DB_CNN: get('DB_CNN').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),

  //* JWT
  SECRET_JWT_SEED: get('SECRET_JWT_SEED').required().asString(),
};
