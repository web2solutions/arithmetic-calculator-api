import mongoose from 'mongoose';

import {
  mongooseConnectionURL, mongooseConnectionOptions,
} from '../../config/mongoose';

export const dbConnection = mongoose.connect(mongooseConnectionURL, mongooseConnectionOptions);
