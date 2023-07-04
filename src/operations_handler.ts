import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';

import { operations } from './model';
import { OperationsController } from './controller/operations';
import { JwtService, IJwtService } from './service/JwtService';
import { AuthService } from './service/AuthService';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const jwtService: IJwtService = new JwtService();
const operationsController = new OperationsController(operations);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await operationsController.create(event, { user, token });
  return response;
};

export const update: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await operationsController.update(event, { user, token });
  return response;
};

export const find: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await operationsController.find(event, { user, token });
  return response;
};

export const findOne: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await operationsController.findOne(event, { user, token });
  return response;
};

export const deleteOne: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuthService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  if (error) {
    return error;
  }
  const response = await operationsController.deleteOne(event, { user, token });
  return response;
};
