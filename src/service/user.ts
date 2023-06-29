/* eslint-disable import/no-extraneous-dependencies */
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { CreateUserDTO } from '../model/dto/createUserDTO';
import { UpdateUserDTO } from '../model/dto/updateUserDTO';
import { UsersDocument } from '../model';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { IPagingResponse } from '../infra/interface/IPagingResponse';
import { loginDTO } from '../model/dto/loginDTO';

export class UsersService {
  private users: Model<UsersDocument>;
  private tokenSecret: string;
  constructor(users: Model<UsersDocument>) {
    this.users = users;
    this.tokenSecret = process.env.TOKEN_KEY || '';
  }

  protected async createUser(params: CreateUserDTO): Promise<UsersDocument | undefined> {
    try {
      const result = await this.users.create({
        username: params.username,
        password: params.password,
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

  protected async updateUsers(_id: string, data: UpdateUserDTO): Promise<UsersDocument | null> {
    try {
      const record = await this.users.findOneAndUpdate(
        { _id },
        { $set: data },
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
      const result = await this.users.find(query).limit(size).skip(skip); // .sort( '-createdOn' )
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
        status: 'active',
      });
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

  protected decodeToken(token: string): JwtPayload | null {
    let valid = null;
    try {
      valid = jwt.verify(token, this.tokenSecret) as JwtPayload;
    } catch (error) {
      valid = null;
    }
    return valid;
  }

  protected generateToken(user: UsersDocument): string {
    const token = jwt.sign(
      { user_id: user.id, username: user.username },
      this.tokenSecret,
      { expiresIn: 60 * 60 }, // one hour
    );
    return token;
  }

  protected async loginUser(data: loginDTO): Promise<UsersDocument | boolean> {
    try {
      /* eslint-disable-next-line no-console */
      // console.log('process.env.TOKEN_KEY', process.env.TOKEN_KEY);
      /* eslint-disable-next-line no-console */
      // console.log('process.env', process.env);
      const { username, password } = data;
      const userFound = await this.users.findOne({
        username,
        password,
      });
      if (!userFound) {
        return false;
      }
      if (userFound.token) {
        const token = this.decodeToken(userFound.token);
        if (token !== null) {
          /* eslint-disable-next-line no-console */
          console.log('DECODED', userFound.token);
          return userFound as UsersDocument;
        }
      }
      const token = this.generateToken(userFound);
      const updatedUser = await this.users.findOneAndUpdate(
        { _id: userFound.id },
        { $set: { token } },
        { new: true },
      );
      return updatedUser as UsersDocument;
    } catch (err: unknown) {
      if (err instanceof Error) {
        /* eslint-disable-next-line no-console */
        console.log('name', err.name);
        /* eslint-disable-next-line no-console */
        console.log('message', err.message);
        throw new ServiceError({
          message: err.message,
        });
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
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        /* eslint-disable-next-line no-console */
        console.log('name', err.name);
        /* eslint-disable-next-line no-console */
        console.log('message', err.message);
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }
}
