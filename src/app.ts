import { envs } from './config/envs';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { ServerApp } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.DB_CNN,
    dbName: envs.DB_NAME,
  });

  const server = new ServerApp({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}
