import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Model } from 'mongoose';
import { Response } from '../utils/message';
import { UsersService } from '../service/user';
import { CreateUserDTO } from '../model/dto/createUserDTO';
import { UpdateUserDTO } from '../model/dto/updateUserDTO';
import { loginDTO } from '../model/dto/loginDTO';
import { HTTPNotFoundError } from '../infra/protocols/HTTP/error/HTTPNotFoundError';
import { UsersDocument } from '../model/users';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { setFilterAndPaging } from '../utils/setFilterAndPaging';
import { isEmail } from '../utils/isEmail';

export class UsersController extends UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor(users: Model<UsersDocument>) {
    super(users);
  }

  public async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const params: CreateUserDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const {
        username, password, status, admin,
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
      });
      return Response.created(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async update(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    // eslint-disable-next-line no-console
    // console.log(event, context);
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
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
  public async find(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const [filter, paging] = setFilterAndPaging(event);
      const result = await this.findUsers({ ...filter }, paging as IPagingRequest);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async findOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.pathParameters) {
      throw new Error('invalid parameters');
    }
    const id: string = event.pathParameters.id || '';
    if (id === '') {
      throw new Error('invalid id');
    }
    try {
      const result = await this.findOneUserById(id);
      if (result === null) {
        throw new HTTPNotFoundError();
      }
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async deleteOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.pathParameters) {
      throw new Error('invalid parameters');
    }
    const id: string = event.pathParameters.id || '';
    try {
      const result = await this.deleteOneUserById(id);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async login(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    // eslint-disable-next-line no-console
    // console.log(event, context);
    try {
      const params: loginDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const { username, password } = params;
      if (!(username && password)) {
        throw new ServiceError({
          code: 400,
          message: 'username and password are mandatory',
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
    // eslint-disable-next-line no-console
    // console.log(event, context);
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
