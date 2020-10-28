const {CompanyTypes, createScraper} = require('israeli-bank-scrapers');

exports.testScraper = async() => {
    try {
        const options = {
            companyId: CompanyTypes.leumi,
            startDate: new Date('2020-10-28'),
            combineInstallments: false,
            showBrowser: true 
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
}