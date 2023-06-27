import { Handler, APIGatewayProxyEvent } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
import 'source-map-support/register';

import { operations } from './model';
import { OperationsController } from './controller/operations';

const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

const operationsController = new OperationsController(operations);

export const create: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await operationsController.create(event);
  return response;
};

export const update: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await operationsController.update(event);
  return response;
};

export const find: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await operationsController.find(event);
  return response;
};

export const findOne: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await operationsController.findOne(event);
  return response;
};

export const deleteOne: Handler = async (event: APIGatewayProxyEvent) => {
  const response = await operationsController.deleteOne(event);
  return response;
};
