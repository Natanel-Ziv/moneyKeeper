import * as dotenv from 'dotenv';
dotenv.config();
import {connectToDb} from './framework/models/dbModels';
import {app} from './app';
import {PORT} from './framework/environment';
//import {getTransactionsFromDate} from './functions/leumi.functions';
import {getTransactionsFromDate} from './functions/max.functions';
import dbFuncs from './functions/db.functions';
import {TransactionDocument} from './txn/txn.interfaces';
import {startBot, queryAllTxns} from './functions/bot.functions';

const port = PORT;

connectToDb();
startBot();

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
  //dbFuncs.deleteAllTxn();
  //getTrans();
  //testing();
});

const testing = async() => {
  const txns = await dbFuncs.getTxn();
  if(txns !== null) queryAllTxns(txns);
};

const getTrans = async() => {
  //const txns = await getTransactionsFromDate(new Date('2020-11-01'));
  const txns = await getTransactionsFromDate(new Date('2020-11-01'));
  //console.log(txns);
  //dbFuncs.addTxns(txns as TransactionDocument[]);
};
