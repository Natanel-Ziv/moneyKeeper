import {TxnModel} from '../txn/txn.models';
import {TransactionDocument} from '../txn/txn.interfaces';

const addTxns = (txnArray: TransactionDocument[]): void => {
  const promiseList: Promise<void | TransactionDocument | undefined>[] = [];
  txnArray.forEach((txn) => {
    promiseList.push(TxnModel.findOne(txn)
      .then((data) => {
        if(!data) TxnModel.create(txn);
      }));
  });
  Promise.all(promiseList)
    .then(() => console.log('All txns added'));
};

const getTxn = async(txn?: TransactionDocument)
  : Promise<TransactionDocument[] | null | TransactionDocument> => {
  const data =  txn ? TxnModel.findOne(txn) : TxnModel.find();
  return data;
};

const deleteAllTxn = (): void => {
  TxnModel.deleteMany({},()=>console.log('DB deleted'));
};

export default {addTxns, getTxn, deleteAllTxn};
