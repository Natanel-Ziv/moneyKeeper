require('dotenv/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const logMiddleware = (req, res, next) => {
    console.log(`Request URL: ${req.originalUrl}\
    \nRequest type: ${req.method}\
    \nRequest param: ${req.body}`);
    next();
};
app.use(logMiddleware);

const routes = require('./routes/basicRoutes')();
app.use('/api/v1', routes);

/* Error handler */
app.use((err, req, res) => {
    console.error(err);
    res.status(err.status || 500).json({ message: (err.status !== 500) ? err.message : 'Unexpected error!' });
});

server.listen(port, () => {
    console.log(`App runs on port: ${port}`);
});

