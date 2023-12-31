import { APIGatewayProxyEvent } from 'aws-lambda';
import { IJwtService } from './JwtService';
import { ServiceError } from '../infra/ServiceError';
import { Response } from '../utils/message';

export class AuthService {
  private jwtService: IJwtService;
  public token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public user: Record<any, any>;
  public error: Error | boolean;

  private version: string;

  constructor(jwtService: IJwtService) {
    this.jwtService = jwtService;
    this.token = '';
    this.user = {};
    this.error = false;
    // eslint-disable-next-line prefer-template
    this.version = '' + Math.random();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public checkToken(event: APIGatewayProxyEvent): Record<any, any> {
    const state = {
      token: '',
      error: false,
      user: {},
      serviceVersion: this.version,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
    const headers = event.headers || {};
    const authorization = headers.authorization || headers.Authorization || false;
    if (!authorization) {
      state.error = Response.error(new ServiceError({
        code: 401,
        message: 'Unauthorized',
      }));
      return state;
    }
    if (authorization && authorization.toString().indexOf('Bearer ') > -1) {
      const token = authorization.split('Bearer ')[1];
      state.token = token;
      const decodedToken = this.jwtService.decodeToken(token);
      state.token = token;
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!!decodedToken) {
        state.error = Response.error(new ServiceError({
          code: 401,
          message: 'Unauthorized',
        }));
      } else {
        state.user = decodedToken;
      }
    }
    this.error = state.error;
    this.token = state.token;
    this.user = state.user;
    return state;
  }
}
