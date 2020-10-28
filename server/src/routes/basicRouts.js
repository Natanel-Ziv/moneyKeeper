const express = require('express');
const router = express.Router();
const leumi = require('../functions/communicateWithBank');

module.exports = () => {
    router.get('/', (req, res) => res.end('Money Keeper'));
    router.get('/testScraper', (req, res, next) => {
        leumi.testScraper()
        .then(() => {
            console.log('Done');
        })
        .catch(next);
    })

    return router;
}