/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

export const ENV = process.env.NODE_ENV || 'ci';

const configFile = `config/.env.${ENV}`;
const dConfig = {
  path: path.resolve(process.cwd(), configFile),
};
dotenv.config(dConfig);

interface IHash {
  hash: string;
  salt: string;
}

export interface ICryptService {
  // genSalt(): Promise<string>;
  hash(password: string): Promise<IHash>;
  compare(plainPassword: string, hash: string): Promise<boolean>;
}

export class CryptService implements ICryptService {
  private saltRounds: number;

  constructor() {
    this.saltRounds = +(process.env.saltRounds || 10);
  }

  private genSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err: unknown, salt: unknown) => {
        if (err) {
          return reject(err);
        }
        return resolve(salt as unknown as string);
      });
    });
  }

  public hash(password: string): Promise<IHash> {
    // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
    return new Promise(async (resolve, reject) => {
      const salt = await this.genSalt();
      // eslint-disable-next-line no-console
      // console.log('salt', salt);
      bcrypt.hash(password, salt, (err: unknown, hash: string) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          hash,
          salt,
        } as unknown as IHash);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public compare(plainPassword: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hash, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  const c = new CryptService();
  const h = await c.hash('123456');
  // eslint-disable-next-line no-console
  console.log(h);
})();
