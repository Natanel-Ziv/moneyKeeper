import express from 'express';
import txnDb from '../functions/db.functions';


const path = '/txn';
const router = express.Router();

const getTxn = async(req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const data = await txnDb.getTxn();
  console.log(data);
  res.send(data);
};

const deleteDb = (req: express.Request, res: express.Response, _next: express.NextFunction) => {
  txnDb.deleteAllTxn();
  res.send('DB deleted!');
};

export = (): express.Router => {
  router.get(path, getTxn);
  return router;
}
