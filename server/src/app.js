require('dotenv/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

app.use(morgan('dev'));

const router = require('./routes/basicRouts')();
app.use('/api/v1', router);

/* Error handler */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ message: (err.status !== 500) ? err.message : 'Unexpected error!' });
});

server.listen(port, () => {
    console.log(`App runs on port: ${port}`);
});
