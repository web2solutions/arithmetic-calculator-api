/* eslint-disable import/no-extraneous-dependencies */
import { Model } from 'mongoose';
import { CreateUserDTO } from '../model/dto/createUserDTO';
import { UpdateUserDTO } from '../model/dto/updateUserDTO';
import { UsersDocument } from '../model';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { IPagingResponse } from '../infra/interface/IPagingResponse';
import { loginDTO } from '../model/dto/loginDTO';
import { CacheService } from './CacheService';
import { IJwtService } from './JwtService';
import { ICryptService } from './CryptService';

export class UsersService {
  private users: Model<UsersDocument>;
  private cacheService: CacheService;
  private jwtService: IJwtService;
  private cryptService: ICryptService;

  constructor(users: Model<UsersDocument>, cacheService: CacheService, jwtService: IJwtService, cryptService: ICryptService) {
    this.users = users;
    this.jwtService = jwtService;
    this.cacheService = cacheService;
    this.cryptService = cryptService;
  }

  protected async createUser(params: CreateUserDTO): Promise<UsersDocument | undefined> {
    try {
      const { hash, salt } = await this.cryptService.hash(params.password);
      const result = await this.users.create({
        username: params.username,
        password: hash,
        salt,
        status: params.status, // default is active
        admin: params.admin,
      });
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async registerUser(params: CreateUserDTO): Promise<UsersDocument | undefined> {
    try {
      const { hash, salt } = await this.cryptService.hash(params.password);
      const result = await this.users.create({
        username: params.username,
        password: hash,
        salt,
        status: params.status, // default is active
        admin: false,
      });
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async updateUsers(_id: string, data: UpdateUserDTO): Promise<UsersDocument | null> {
    try {
      const newData = { ...data };
      delete newData.password;
      if (data.password) {
        if (data.password !== '') {
          const { hash, salt } = await this.cryptService.hash(data.password);
          newData.password = hash;
          newData.salt = salt;
        }
      }
      const record = await this.users.findOneAndUpdate(
        { _id },
        { $set: newData },
        { new: true },
      );
      return record;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async findUsers(
    filters: Record<string, string|number> = {},
    paging: IPagingRequest
  ): Promise<IPagingResponse<Array<UsersDocument>>> {
    let { page, size } = paging;
    page = page ? Math.round(page) : 1;
    size = size ? Math.round(size) : 20;
    let query = {
      // status: 'active',
    };
    if (filters) {
      query = { ...filters, ...query };
    }
    try {
      const skip = (page * size) - size;
      const result = await this.users.find(query).select('-password').limit(size).skip(skip); // .sort( '-createdOn' )
      const total = await this.users.count();
      return {
        result, page, size, total,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async findOneUserById(_id: string): Promise<UsersDocument | null> {
    try {
      const record = await this.users.findOne({
        _id,
        // status: 'active',
      }).select('-password');
      return record;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async deleteOneUserById(_id: string): Promise<boolean> {
    try {
      await this.users.findOneAndUpdate(
        {
          _id,
          status: 'active',
        },
        { $set: { status: 'inactive' } },
        { new: false },
      );
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async loginUser(data: loginDTO): Promise<UsersDocument | boolean> {
    const { username, password } = data;
    try {
      const userFound = await this.users.findOne({
        username,
        // password,
      }).select('+password');
      if (!userFound) {
        return false;
      }
      const passwordMatch = await this.cryptService.compare(password, userFound.password);
      if (!passwordMatch) {
        return false;
      }
      const existingToken = await this.cacheService.get('token', username);
      if (existingToken) {
        const token = this.jwtService.decodeToken(existingToken);
        if (token !== null) {
          userFound.token = existingToken;
          return userFound as UsersDocument;
        }
      }
      const token = this.jwtService.generateToken(userFound);
      await this.cacheService.set('token', username, token);
      userFound.token = token;
      userFound.password = '';
      return userFound as UsersDocument;
    } catch (err: unknown) {
      await this.cacheService.del('token', username);
      if (err instanceof Error) {
        throw new ServiceError({ ...err, code: 500 });
      }
      throw err;
    }
  }

  protected async logoutUser(username: string, token: string): Promise<boolean> {
    try {
      const userFound = await this.users.findOneAndUpdate(
        { username, token },
        { $set: { token: '' } },
        { new: false },
      );
      if (!userFound) {
        return false;
      }
      await this.cacheService.del('token', username);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }
}
