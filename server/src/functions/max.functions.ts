import {CompanyTypes, createScraper} from 'israeli-bank-scrapers';
import MaxScraper from 'israeli-bank-scrapers/lib/scrapers/max';
import { LEUMI_PASSWORD, LEUMI_USERNAME } from '../framework/environment';
import {ScraperCredentials} from './leumi.functions';
import {TransactionDocument} from '../txn/txn.interfaces';

const credentials: ScraperCredentials = {
  username: LEUMI_USERNAME,
  password: LEUMI_PASSWORD
};

const options = {
  companyId: CompanyTypes.max,
  startDate: new Date(),
  combineInstallments: false,
  showBrowser: true
};

const maxScraper = createScraper(options) as MaxScraper;

const setDate = (date: Date) => {
  maxScraper.options.startDate = date;
};

export const getTransactionsFromDate = async (date?: Date): Promise<TransactionDocument[]> => {
  const txns: TransactionDocument[] = [];
  if(date) {
    setDate(date);
  }
  try {
    console.log('Running scraper on Max');
    const scraperResult = await maxScraper.scrape(credentials);
    if(!scraperResult.success) {
      throw new Error(scraperResult.errorType);
    }
    scraperResult.accounts?.forEach((account) => {
      console.log(`found ${account.txns.length}, transactions for account number ${account.accountNumber}`);
      const accTxns = account.txns;
      accTxns.forEach((txn) => {
        const txnDoc = txn as TransactionDocument;
        txnDoc.accountNumber = account.accountNumber;
        txnDoc.source = 'Max';
        txns.push(txnDoc);
        /*console.log(`Transaction: Date: ${txn.date} on amount of ${txn.chargedAmount}\
        \nDescription: ${txn.description}. ${txn.memo}`); */
      });
    });
  } catch(e) {
    console.error(`scraping failed for the following reason: ${e.message}`);
  }
  return txns;
};