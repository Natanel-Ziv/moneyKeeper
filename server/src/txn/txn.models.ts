import mongoose from 'mongoose';
import {TransactionDocument} from './txn.interfaces';

const txnSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  identifier: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  processedDate: {
    type: Date,
    required: true
  },
  originalAmount:{ 
    type: Number,
    required: true
  },
  originalCurrency: {
    type: String,
    required: true
  },
  chargedAmount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  memo: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  installments: {
    number: {
      type: Number
    },
    total: {
      type: Number
    }
  },
  checkedByMe: {
    type: Number,
    min: -1,
    max: 1,
    default: 0,
    required: true
  },
  source: {
    type: String,
    required: true,
    default: 'unknown'
  },
  accountNumber: {
    type: String,
    required: false
  }
});

export const TxnModel = mongoose.model<TransactionDocument>('txn', txnSchema);
