const {CompanyTypes, createScraper} = require('israeli-bank-scrapers');

exports.getTransactionsSince = async(date) => {
    try {
        const options = {
            companyId: CompanyTypes.leumi,
            startDate: date,
            combineInstallments: false,
            showBrowser: false
        };

        const credentials = {
            username: process.env.LEUMI_USERNAME,
            password: process.env.LEUMI_PASSWORD
        };

        const scraper = createScraper(options);
        const scraperResult = await scraper.scrape(credentials);

        if(scraperResult.success) {
            scraperResult.accounts.forEach((account) => {
                console.log(`found ${account.txns.length}, transactions for account number ${account.accountNumber}`);
            });
        } else {
            throw new Error(scraperResult.errorType);
        }
    } catch(e) {
        console.error(`scraping failed for the following reason: ${e.message}`);
    }
};
