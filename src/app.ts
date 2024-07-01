import { Envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { ServerApp } from './presentation/server';

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: Envs.mongoUrl(),
    dbName: Envs.dbName(),
  });

  const server = new ServerApp({
    port: Envs.port(),
    publicPath: Envs.publicPath(),
    routes: AppRoutes.routes,
  });

  server.start();
}
