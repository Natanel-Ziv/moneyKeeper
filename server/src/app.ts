import express from 'express';
import * as bodyParser from 'body-parser';
import Routes from './routes/routes';
import requestMiddleware from './middleware/request.middleware';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;
  public port: number;

  constructor(routes: Routes, port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(requestMiddleware);
    this.app.use(errorMiddleware);
  }

  private initRoutes(routes: Routes) {
    this.app.use('/api/v1', routes.router);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App is running on port: ${this.port}`);
    });
  }
}

export default App;