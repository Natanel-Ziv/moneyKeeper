import { Document } from 'mongoose';

export interface TransactionsAccount {
  accountNumber: string;
  txns: Transaction[];
}
export declare enum TransactionTypes {
  Normal = 'normal',
  Installments = 'installments'
}
export declare enum TransactionStatuses {
  Completed = 'completed',
  Pending = 'pending'
}
export interface TransactionInstallments {
  /**
   * the current installment number
   */
  number: number;
  /**
   * the total number of installments
   */
  total: number;
}
export interface Transaction {
  type: TransactionTypes;
  /**
   * sometimes called Asmachta
   */
  identifier?: number;
  /**
   * ISO date string
   */
  date: string;
  /**
   * ISO date string
   */
  processedDate: string;
  originalAmount: number;
  originalCurrency: string;
  chargedAmount: number;
  description: string;
  memo?: string;
  status: TransactionStatuses;
  installments?: TransactionInstallments;
}

export interface TransactionDocument extends Transaction, Document {
  checkedByMe: boolean;
}
