import { Router } from 'express';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infraestructure';
import { AuthController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const authController = new AuthController(authRepository);

    router.post('/new', authController.registerUser);
    router.post('/', authController.loginUser);
    router.get(
      '/renew',
      [AuthMiddleware.validateJwt as any],
      authController.loginUser
    );

    return router;
  }
}
