import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { ServerApp } from './presentation/server';

(async () => {
  main();
})();

function main() {
  const server = new ServerApp({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}
