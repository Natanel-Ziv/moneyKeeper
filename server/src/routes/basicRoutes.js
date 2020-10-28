const express = require('express');
const router = express.Router();
const leumi = require('../functions/communicateWithBank');

module.exports = () => {
    router.get('/', (req, res) => {
        res.end('Money Keeper');
    });

    router.post('/testScraper', (req, res, next) => {
        const date = req.body;
        console.log(date);
        leumi.getTransactionsSince(date)
            .then(() => {
                console.log('done');
                res.end('Success');
            })
            .catch(next);
    });

    return router;
};
