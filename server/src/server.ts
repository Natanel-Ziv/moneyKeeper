import * as dotenv from 'dotenv';
dotenv.config();
import App from './app';
import BankLeumi from './functions/bankLeumi';
import Routes from './routes/routes';
const port: number = parseInt(`${process.env.PORT}`, 10) || 3000;

const leumi = new BankLeumi({
  username: <string>process.env.LEUMI_USERNAME,
  password: <string>process.env.LEUMI_PASSWORD
}, new Date('2020-09-20'));
leumi.getTransactionsFromDate();

const app = new App(new Routes, port);
app.listen();

