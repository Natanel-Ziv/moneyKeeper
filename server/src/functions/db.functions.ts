import {TxnModel} from '../txn/txn.models';
import {TransactionDocument} from '../txn/txn.interfaces';

const addTxns = (txnArray: TransactionDocument[]): Promise<void | (void | TransactionDocument | undefined)[]> => {
  const promiseList: Promise<void | TransactionDocument | undefined>[] = [];
  txnArray.forEach((txn) => {
    promiseList.push(TxnModel.findOne(txn)
      .then((data) => {
        if(!data) TxnModel.create(txn);
      }));
  });
  return Promise.all(promiseList)
    .catch((err) => console.error(err));
};

const getTxn = async(txn?: TransactionDocument)
  : Promise<TransactionDocument[] | null | TransactionDocument> => {
  const data =  txn ? TxnModel.findOne(txn) : TxnModel.find();
  return data;
};

const deleteAllTxn = (): void => {
  TxnModel.deleteMany({},()=>console.log('DB deleted'));
};

const setApproved = (id: string) => {
  
}

export default {addTxns, getTxn, deleteAllTxn};
