/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as redis from 'redis';
import { RedisClientType } from 'redis';
import { IErrorData } from '../infra/interface/IErrorData';
import { ServiceError } from '../infra/ServiceError';

type RedisConfig = {
  host: string;
  port?: number;
  password?: string;
};

export class CacheService {
  public client: RedisClientType;
  constructor() {
    const redisConfig: RedisConfig = {
      host: process.env.REDIS_HOST || 'localhost',
      port: +(process.env.REDIS_PORT || 6379),
      password: process.env.REDIS_PASSWORD,
    };

    this.client = redis.createClient(redisConfig);
  }
  public async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async get(keyName: string, uuid: string): Promise<any> {
    try {
      const value = await this.client.get(`${keyName}:${uuid}`);
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async setJson(keyName: string, uuid: string, record: Record<any, any>): Promise<any> {
    try {
      const value = await this.client.set(`${keyName}:${uuid}`, '$', record);
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async set(keyName: string, uuid: string, record: string): Promise<any> {
    try {
      const value = await this.client.set(`${keyName}:${uuid}`, record);
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async hset(keyName: string, uuid: string, record: Record<any, any>): Promise<any> {
    try {
      const value = await this.client.hSet(`${keyName}:${uuid}`, record);
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }
}
