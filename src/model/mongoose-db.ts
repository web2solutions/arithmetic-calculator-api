import mongoose from 'mongoose';

import {
  mongooseConnectionURL, mongooseConnectionOptions,
} from '../../config/mongoose';

export const dbConnection = mongoose.connect(mongooseConnectionURL, mongooseConnectionOptions);
// eslint-disable-next-line no-console
// console.log({ mongooseConnectionURL, mongooseConnectionOptions });
