import dotenv from 'dotenv';
import path from 'path';

export const ENV = process.env.NODE_ENV || '';

const configFile = `config/.env.${ENV}`;
const dConfig = {
  path: path.resolve(process.cwd(), configFile),
};
dotenv.config(dConfig);

export type RedisConfig = {
  url?: string;
  host?: string;
  port?: number;
  password?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket?: any;
};

export const RedisHOST: Record<string, string> = {
  '': process.env.REDIS_HOST || '',
  dev: process.env.REDIS_HOST || '',
  docker: process.env.REDIS_HOST || '',
  test: process.env.REDIS_HOST_LABS || '',
  ci: process.env.REDIS_HOST_LABS || '',
  stg: process.env.REDIS_HOST_LABS || '',
  prod: process.env.REDIS_HOST_LABS || '',
};

export const RedisPassword: Record<string, string> = {
  '': process.env.REDIS_PASSWORD || '',
  dev: process.env.REDIS_PASSWORD || '',
  docker: process.env.REDIS_PASSWORD || '',
  test: process.env.REDIS_PASSWORD_LABS || '',
  ci: process.env.REDIS_PASSWORD_LABS || '',
  stg: process.env.REDIS_PASSWORD_LABS || '',
  prod: process.env.REDIS_PASSWORD_LABS || '',
};

export const RedisPORT: Record<string, number> = {
  '': +(process.env.REDIS_PORT || 6379),
  dev: +(process.env.REDIS_PORT || 6379),
  docker: +(process.env.REDIS_PORT || 6379),
  test: +(process.env.REDIS_PORT_LABS || 6379),
  ci: +(process.env.REDIS_PORT_LABS || 6379),
  stg: +(process.env.REDIS_PORT_LABS || 6379),
  prod: +(process.env.REDIS_PORT_LABS || 6379),
};

const localConfig: RedisConfig = {
  host: RedisHOST[ENV],
  port: RedisPORT[ENV],
  password: RedisPassword[ENV],
};

const redisLabsConfig = {
  password: RedisPassword[ENV],
  socket: {
    host: RedisHOST[ENV],
    port: RedisPORT[ENV],
  },
};

const rConfig: Record<string, RedisConfig> = {
  '': localConfig,
  dev: localConfig,
  docker: localConfig,
  test: redisLabsConfig,
  ci: redisLabsConfig,
  stg: redisLabsConfig,
  prod: redisLabsConfig,
};

export const redisConfig = rConfig[ENV];
