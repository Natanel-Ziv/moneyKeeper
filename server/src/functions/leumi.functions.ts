import {CompanyTypes, createScraper} from 'israeli-bank-scrapers';
import LeumiScraper from 'israeli-bank-scrapers/lib/scrapers/leumi';
import {TransactionDocument} from '../txn/txn.interfaces';
import {LEUMI_USERNAME, LEUMI_PASSWORD} from '../framework/environment';

export type ScraperCredentials = {
  username: string,
  password: string
};

const credentials: ScraperCredentials = {
  username: LEUMI_USERNAME,
  password: LEUMI_PASSWORD
};

const options = {
  companyId: CompanyTypes.leumi,
  startDate: new Date(),
  combineInstallments: false,
  showBrowser: true
};

const leumiScraper = createScraper(options) as LeumiScraper;

const setDate = (date: Date) => {
  leumiScraper.options.startDate = date;
};

export const getTransactionsFromDate = async (date?: Date): Promise<TransactionDocument[]> => {
  const txns: TransactionDocument[] = [];
  if(date) {
    setDate(date);
  }
  try {
    console.log('Running scraper on Leumi');
    const scraperResult = await leumiScraper.scrape(credentials);
    if(!scraperResult.success) {
      throw new Error(scraperResult.errorType);
    }
    scraperResult.accounts?.forEach((account) => {
      console.log(`found ${account.txns.length}, transactions for account number ${account.accountNumber}`);
      const accTxns = account.txns;
      accTxns.forEach((txn) => {
        txns.push(txn as TransactionDocument);
        /* console.log(`Transaction: Date: ${txn.date} on amount of ${txn.chargedAmount}\
        \nDescription: ${txn.description}. ${txn.memo}`); */
      });
    });
  } catch(e) {
    console.error(`scraping failed for the following reason: ${e.message}`);
  }
  return txns;
};