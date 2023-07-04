import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Model } from 'mongoose';
import { Response } from '../utils/message';
import { CacheService } from '../service/CacheService';
import { UsersService } from '../service/user';
import { CreateUserDTO } from '../model/dto/createUserDTO';
import { UpdateUserDTO } from '../model/dto/updateUserDTO';
import { loginDTO } from '../model/dto/loginDTO';
import { HTTPNotFoundError } from '../infra/protocols/HTTP/error/HTTPNotFoundError';
import { UsersDocument } from '../model/users';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { setFilter } from '../utils/setFilter';
import { setPaging } from '../utils/setPaging';
import { isEmail } from '../utils/isEmail';
import { IJwtService } from '../service/JwtService';
import { EUserStatus } from '../model/dto/EUserStatus';
import { IIdentity } from '../infra/interface/IIdentity';

export class UsersController extends UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor(users: Model<UsersDocument>, cacheService: CacheService, jwtService: IJwtService) {
    super(users, cacheService, jwtService);
  }

  public async create(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      const params: CreateUserDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      if (!identity.user.admin) {
        throw new ServiceError({
          code: 403,
          message: 'only admins can create users',
        });
      }
      const {
        username, password, status, admin, balance,
      } = params;
      if (!(username && password)) {
        throw new ServiceError({
          code: 400,
          message: 'username and password are mandatory',
        });
      }
      if (!isEmail(username)) {
        throw new ServiceError({
          code: 400,
          message: 'username must be a valid email address',
        });
      }
      const result = await this.createUser({
        username,
        password,
        status,
        admin,
        balance,
      });
      return Response.created(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async update(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
      }
      if (!identity.user.admin) {
        if (identity.user.user_id !== id) {
          throw new ServiceError({
            code: 403,
            message: 'non admin user can only edit their own user data',
          });
        }
      }
      const body: UpdateUserDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      if (body.username) {
        if (!isEmail(body.username)) {
          throw new ServiceError({
            code: 400,
            message: 'username must be a valid email address',
          });
        }
      }
      const result = await this.updateUsers(id, body);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
  public async find(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      const filters = setFilter(event);
      const paging = setPaging(event);

      if (!identity.user.admin) {
        filters.status = 'active';
        // eslint-disable-next-line no-underscore-dangle
        filters._id = identity.user.user_id;
      }
      const result = await this.findUsers({ ...filters }, paging as IPagingRequest);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async findOne(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
      }
      if (!identity.user.admin) {
        if (identity.user.user_id !== id) {
          throw new ServiceError({
            code: 403,
            message: 'non admin user can only find their own user data',
          });
        }
      }
      const result = await this.findOneUserById(id);
      if (result === null) {
        throw new HTTPNotFoundError();
      }
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async deleteOne(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (!identity.user.admin) {
        if (identity.user.user_id !== id) {
          throw new ServiceError({
            code: 403,
            message: 'non admin user can only find their own user data',
          });
        }
      }
      const result = await this.deleteOneUserById(id);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async register(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const params: CreateUserDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const {
        username, password,
      } = params;
      if (!(username && password)) {
        throw new ServiceError({
          code: 400,
          message: 'username and password are mandatory',
        });
      }
      if (!isEmail(username)) {
        throw new ServiceError({
          code: 400,
          message: 'username must be a valid email address',
        });
      }
      const result = await this.registerUser({
        username,
        password,
        status: EUserStatus.active,
        admin: false,
      });
      return Response.created(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
  public async login(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const params: loginDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const { username, password } = params;
      if (!(username && password)) {
        throw new ServiceError({
          code: 400,
          message: 'username and password are mandatory',
        });
      }
      if (!isEmail(username)) {
        throw new ServiceError({
          code: 400,
          message: 'username must be a valid email address',
        });
      }
      const result = await this.loginUser({
        username,
        password,
      });
      if (!result) {
        throw new ServiceError({
          message: 'user not found',
          code: 404,
        });
      }
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async logout(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const params = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const { username, token } = params;
      if (!(username && token)) {
        throw new ServiceError({
          code: 400,
          message: 'username and token are mandatory',
        });
      }
      const result = await this.logoutUser(username, token);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
}
