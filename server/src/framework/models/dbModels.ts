import mongoose from 'mongoose';
import {MONGO_PASSWORD, MONGO_PATH, MONGO_USER} from '../environment';

export const connectToDb = (): void => {
  mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('connected to DB'))
    .catch(err => console.log(err));
};