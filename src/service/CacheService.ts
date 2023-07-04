/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as redis from 'redis';
import { RedisClientType } from 'redis';
import { IErrorData } from '../infra/interface/IErrorData';
import { ServiceError } from '../infra/ServiceError';
import { redisConfig } from '../../config/redis';

export class CacheService {
  private client: RedisClientType;
  constructor() {
    this.client = redis.createClient(redisConfig);
    // eslint-disable-next-line no-console
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    // eslint-disable-next-line no-console
    // console.log(redisConfig, ENV);
    // eslint-disable-next-line no-console
    // console.log('env', ENV);
  }

  public async get(keyName: string, uuid: string): Promise<any> {
    try {
      await this.client.connect();
      const value = await this.client.get(`${keyName}:${uuid}`);
      await this.client.quit();
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async del(keyName: string, uuid: string): Promise<any> {
    try {
      await this.client.connect();
      const value = await this.client.del(`${keyName}:${uuid}`);
      await this.client.quit();
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async setJson(keyName: string, uuid: string, record: Record<any, any>): Promise<any> {
    try {
      await this.client.connect();
      const value = await this.client.set(`${keyName}:${uuid}`, '$', record);
      await this.client.quit();
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async set(keyName: string, uuid: string, record: string): Promise<any> {
    try {
      await this.client.connect();
      const value = await this.client.set(`${keyName}:${uuid}`, record);
      await this.client.quit();
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }

  public async hset(keyName: string, uuid: string, record: Record<any, any>): Promise<any> {
    try {
      await this.client.connect();
      const value = await this.client.hSet(`${keyName}:${uuid}`, record);
      await this.client.quit();
      return value;
    } catch (error) {
      throw new ServiceError(error as unknown as IErrorData);
    }
  }
}
