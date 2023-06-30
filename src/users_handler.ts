import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';

import { users } from './model/index';
import { UsersController } from './controller/users';
import { CacheService } from './service/CacheService';
import { JwtService, IJwtService } from './service/JwtService';
import { AuhtService } from './service/AuthService';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const secret = process.env.TOKEN_KEY;
const jwtService: IJwtService = new JwtService(secret);
const cacheService = new CacheService();
const usersController = new UsersController(users, cacheService, jwtService);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const authService = new AuhtService(jwtService);
  const { user, token, error } = authService.checkToken(event);
  // eslint-disable-next-line no-console
  console.log({ user, token, error });
  if (error) {
    return error;
  }
  const response = await usersController.create(event/** , { user, token } */);
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
  const response = await usersController.update(event/** , { user, token } */);
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
  const response = await usersController.find(event/** , { user, token } */);
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
  const response = await usersController.findOne(event/** , { user, token } */);
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
  const response = await usersController.deleteOne(event/** , { user, token } */);
  return response;
};

export const register: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await usersController.register(event);
  return response;
};

export const login: Handler = async (event: APIGatewayProxyEvent) => {
  await cacheService.connect();
  const response = await usersController.login(event);
  await cacheService.client.disconnect();
  return response;
};

export const logout: Handler = async (event: APIGatewayProxyEvent) => {
  await cacheService.connect();
  const response = await usersController.logout(event);
  await cacheService.client.disconnect();
  return response;
};
