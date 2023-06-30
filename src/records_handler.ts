import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';

import { records } from './model';
import { RecordsController } from './controller/records';
import { JwtService, IJwtService } from './service/JwtService';
import { AuhtService } from './service/AuthService';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const secret = process.env.TOKEN_KEY;
const jwtService: IJwtService = new JwtService(secret);
const recordsController = new RecordsController(records);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await recordsController.create(event);
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
  const response = await recordsController.update(event);
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
  const response = await recordsController.find(event);
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
  const response = await recordsController.findOne(event);
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
  const response = await recordsController.deleteOne(event);
  return response;
};
