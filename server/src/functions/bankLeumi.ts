import {CompanyTypes, createScraper} from 'israeli-bank-scrapers';
import LeumiScraper from 'israeli-bank-scrapers/lib/scrapers/leumi';

export declare type ScraperCredentials = Record<string, string>;

class BankLeumi {
  private credentials: ScraperCredentials;
  private leumiScraper: LeumiScraper;

  constructor(credentials: ScraperCredentials, date: Date) {
    this.credentials = credentials;

    const options = {
      companyId: CompanyTypes.leumi,
      startDate: date,
      combineInstallments: false,
      showBrowser: true
    };
    this.leumiScraper = <LeumiScraper>createScraper(options);
  }

  public async getTransactionsFromDate(date?: Date): Promise<void> {
    if(date) {
      this.leumiScraper.options.startDate = date;
    }
    try {
      const scraperResult = await this.leumiScraper.scrape(this.credentials);
      if(scraperResult.success) {
        scraperResult.accounts?.forEach((account) => {
          console.log(`found ${account.txns.length}, transactions for account number ${account.accountNumber}`);
          const txns = account.txns;
          return txns;
        });
      } else {
        throw new Error(scraperResult.errorType);
      }
    } catch(e) {
      console.error(`scraping failed for the following reason: ${e.message}`);
    }
  }
}

export default BankLeumi;