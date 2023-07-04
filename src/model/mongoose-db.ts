import mongoose from 'mongoose';

import {
  mongooseConnectionURL, mongooseConnectionOptions,
} from '../../config/mongoose';
// eslint-disable-next-line no-console
console.log({ mongooseConnectionURL, mongooseConnectionOptions });
export const dbConnection = mongoose.connect(mongooseConnectionURL, mongooseConnectionOptions);
