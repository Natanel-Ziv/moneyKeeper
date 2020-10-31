import express from 'express';

class Routes {
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req: express.Request, res: express.Response) => {
      res.end('Money Keeper!');
    });
  }
}

export default Routes;