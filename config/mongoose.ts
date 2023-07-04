import dotenv from 'dotenv';
import path from 'path';

// eslint-disable-next-line no-console
console.log('>>>>>>>> process.env.NODE_ENV', process.env.NODE_ENV);

export const ENV = process.env.NODE_ENV || 'ci';

export const configFile = `config/.env.${ENV}`;
export const dConfig = {
  path: path.resolve(process.cwd(), configFile),
};
dotenv.config(dConfig);

const MongoURL: Record<string, string> = {
  '': process.env.MONGO_LOCAL_URL || '',
  dev: process.env.MONGO_LOCAL_URL || '',
  docker: process.env.MONGO_LOCAL_URL || '',
  test: process.env.MONGO_ATLAS_URL || '',
  ci: process.env.MONGO_ATLAS_URL || '',
  stg: process.env.MONGO_ATLAS_URL || '',
  prod: process.env.MONGO_ATLAS_URL || '',
};

export const mongooseConnectionURL = MongoURL[ENV];

export const mongooseConnectionOptions = {
  dbName: process.env.MONGO_DATABASE,
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
};

// eslint-disable-next-line no-console
console.log({ mongooseConnectionURL, mongooseConnectionOptions, ENV });
