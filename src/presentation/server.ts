import express, { Router } from 'express';
import cors from 'cors';

interface Options {
  port: number;
  publicPath?: string;
  routes: Router;
}

export class ServerApp {
  private app = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath = 'public', routes } = options;

    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json());

    //* Public path
    this.app.use(express.static(this.publicPath));

    //*Routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
