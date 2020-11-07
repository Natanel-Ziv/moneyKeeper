import express from 'express';

const router = express.Router();

export = (): express.Router => {
  router.get('/', (req: express.Request, res: express.Response) => {
    res.end('Money Keeper!');
  });

  return router;
}