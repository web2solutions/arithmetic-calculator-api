import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';

import { operations } from './model';
import { OperationsController } from './controller/operations';
import { JwtService, IJwtService } from './service/JwtService';
import { AuhtService } from './service/AuthService';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const secret = process.env.TOKEN_KEY;
const jwtService: IJwtService = new JwtService(secret);
const operationsController = new OperationsController(operations);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await operationsController.create(event);
  return response;
};

export const update: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await operationsController.update(event);
  return response;
};

export const find: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await operationsController.find(event);
  return response;
};

export const findOne: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await operationsController.findOne(event);
  return response;
};

export const deleteOne: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await operationsController.deleteOne(event);
  return response;
};
