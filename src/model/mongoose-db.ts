import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// const dotenvPath = path.join(__dirname, '../../config/', `.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: path.resolve(process.cwd(), 'config/.env.dev'),
});
// eslint-disable-next-line import/no-mutable-exports
let dbConnection: unknown;
if (process.env.NODE_ENV !== 'CI') {
  dbConnection = mongoose.connect(process.env.DATABASE_URL || '', {
    // dbName: 'arithmetic-calculator-api',
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  });
}
export { dbConnection };
