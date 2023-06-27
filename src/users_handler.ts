import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
// import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';

import { users } from './model/index';
import { UsersController } from './controller/users';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const usersController = new UsersController(users);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await usersController.create(event);
  return response;
};

export const update: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await usersController.update(event);
  return response;
};

export const find: Handler = async (event: APIGatewayProxyEvent) => {
  // eslint-disable-next-line no-console
  // console.log(event);
  const response = await usersController.find(event);
  return response;
};

export const findOne: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await usersController.findOne(event);
  return response;
};

export const deleteOne: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await usersController.deleteOne(event);
  return response;
};
