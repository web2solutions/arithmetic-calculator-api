import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';
import { operations, records, users } from './model';
import { RecordsController } from './controller/records';
import { JwtService, IJwtService } from './service/JwtService';
import { AuthService } from './service/AuthService';
import { RandomService } from './service/RandomService';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const jwtService: IJwtService = new JwtService();
const recordsController = new RecordsController(records, operations, users, RandomService);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await recordsController.create(event, { user, token });
  return response;
};

export const update: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await recordsController.update(event, { user, token });
  return response;
};

export const find: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await recordsController.find(event, { user, token });
  return response;
};

export const findOne: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await recordsController.findOne(event);
  return response;
};

export const deleteOne: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await recordsController.deleteOne(event, { user, token });
  return response;
};
