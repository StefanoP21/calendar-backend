import { Router } from 'express';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraestructure';
import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const authController = new AuthController(authRepository);

    router.post('/new', authController.registerUser);
    router.post('/', authController.loginUser);

    return router;
  }
}
