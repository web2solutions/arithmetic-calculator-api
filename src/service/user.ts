import { Model } from 'mongoose';
import { CreateUserDTO } from '../model/dto/createUserDTO';
import { UpdateUserDTO } from '../model/dto/updateUserDTO';
import { UsersDocument } from '../model';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { IPagingResponse } from '../infra/interface/IPagingResponse';
import { loginDTO } from '../model/dto/loginDTO';

export class UsersService {
  private users: Model<UsersDocument>;
  constructor(users: Model<UsersDocument>) {
    this.users = users;
  }

  protected async createUser(params: CreateUserDTO): Promise<UsersDocument | undefined> {
    try {
      const result = await this.users.create({
        username: params.username,
        password: params.password,
        status: params.status, // default is active
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
      status: 'active',
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

  protected async loginUser(data: loginDTO): Promise<string | boolean> {
    try {
      const token = '';
      const { username, password } = data;
      const record = await this.users.findOne({
        username,
        password,
      });
      if (!record) {
        // create token
        return false;
      }
      return token;
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
