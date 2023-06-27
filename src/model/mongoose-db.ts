import mongoose from 'mongoose';

// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';

const dotenvPath = path.join(__dirname, '../../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const dburl: string = process.env.DATABASE_URL || 'mongodb://localhost:27017/arithmetic-calculator-api';

export const dbConnection = mongoose.connect(dburl, {
  // dbName: 'arithmetic-calculator-api',
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});
