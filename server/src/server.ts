import * as dotenv from 'dotenv';
dotenv.config();
import {connectToDb} from './framework/models/dbModels';
import {app} from './app';
import {PORT} from './framework/environment';
import {getTransactionsFromDate} from './functions/leumi.functions';
import dbFuncs from './functions/db.functions';
import {TransactionDocument} from './txn/txn.interfaces';
import {startBot} from './functions/bot.functions';

const port = PORT;

connectToDb();
startBot();
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
  //dbFuncs.deleteAllTxn();
  //getTrans();
});

const getTrans = async() => {
  const txns = await getTransactionsFromDate(new Date('2020-11-01'));
  dbFuncs.addTxns(txns as TransactionDocument[]);
};
