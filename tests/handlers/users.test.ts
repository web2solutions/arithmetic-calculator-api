// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import mongoose from 'mongoose';
import { Response } from '../../src/utils/message';
import { ServiceError } from '../../src/infra/ServiceError';

import {
  createUserErrorString,
  eventCreateUser,
  eventUpdateUserPassword,
  eventUpdateExistingUserUsername,
  eventFindUser,
  updateUserErrorString,
  initialUsersRecords,
} from '../users.mock';
import { contextCreateUser } from '../context.createUser.mock';
import {
  create,
  update,
  find,
  findOne,
  deleteOne,
} from '../../src/users_handler';
import { UsersController } from '../../src/controller/users';

describe('integration testing - Users', () => {
  // let createdId = '';
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line jest/no-hooks
  afterAll(async () => {
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
  });

  describe('create User handler', () => {
    it('should properly create user', async () => {
      expect.hasAssertions();

      const mockedService = jest.spyOn(UsersController.prototype, 'create')
        .mockResolvedValue(
          Response.created(JSON.parse(eventCreateUser.body))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await create(eventCreateUser, context, () => 0);
      // eslint-disable-next-line no-console
      // console.log(response);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(201);
      const responseBody = JSON.parse(response.body);
      const requestBody = JSON.parse(eventCreateUser.body);
      expect(responseBody.data.password).toStrictEqual(requestBody.password);
      // eslint-disable-next-line no-underscore-dangle
      // createdId = responseBody._id;
    });
    it('should not properly create existing user', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(UsersController.prototype, 'create')
        .mockResolvedValue(
          Response.error(new ServiceError({
            message: createUserErrorString,
            code: 500,
          }))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await create(eventCreateUser, context, () => 0);
      // eslint-disable-next-line no-console
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(500);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateUser.body);
      expect(responseBody.message).toStrictEqual(createUserErrorString);
    });
    it('should not properly create user with invalid username', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(UsersController.prototype, 'create')
        .mockResolvedValue(
          Response.error(new ServiceError({
            message: 'username must be a valid email address',
            code: 400,
          }))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const originalRecord = { ...eventCreateUser };
      const newBody = JSON.parse(eventCreateUser.body);
      newBody.username = 'invalid email';
      originalRecord.body = JSON.stringify(newBody);
      const response = await create(originalRecord, context, () => 0);
      // eslint-disable-next-line no-console
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(400);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateUser.body);
      expect(responseBody.message).toStrictEqual('username must be a valid email address');
    });
  });

  describe('update User handler', () => {
    it('should properly update user password', async () => {
      expect.hasAssertions();
      const originalRecord = JSON.parse(eventCreateUser.body);
      const newPasswordRecord = JSON.parse(eventUpdateUserPassword.body);
      const mockedService = jest
        .spyOn(UsersController.prototype, 'update')
        .mockResolvedValue(
          Response.success({ ...originalRecord, ...newPasswordRecord })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await update(eventUpdateUserPassword, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventUpdateUserPassword.body);
      expect(responseBody.data.password).toStrictEqual(newPasswordRecord.password);
    });
    it('should not properly update username and set an existing username', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(UsersController.prototype, 'update').mockResolvedValue(
        Response.error(new ServiceError({
          message: updateUserErrorString,
          code: 500,
        }))
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await update(eventUpdateExistingUserUsername, context, () => 0);
      // eslint-disable-next-line no-console
      // console.log(response);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(500);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateUser.body);
      expect(responseBody.message).toStrictEqual(createUserErrorString);
    });
    it('should not properly update username and set a invalid username', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(UsersController.prototype, 'update').mockResolvedValue(
        Response.error(new ServiceError({
          message: 'username must be a valid email address',
          code: 400,
        }))
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const originalRecord = { ...eventUpdateExistingUserUsername };
      const newBody = JSON.parse(eventUpdateExistingUserUsername.body);
      newBody.username = 'invalid email';
      originalRecord.body = JSON.stringify(newBody);
      const response = await update(originalRecord, context, () => 0);
      // eslint-disable-next-line no-console
      // console.log(response);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(400);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateUser.body);
      expect(responseBody.message).toStrictEqual('username must be a valid email address');
    });
  });

  describe('find Users handler', () => {
    it('should properly list users', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(UsersController.prototype, 'find')
        .mockResolvedValue(
          Response.success({
            page: 1,
            size: 20,
            result: initialUsersRecords,
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await find(eventFindUser, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // eslint-disable-next-line no-console
      // console.log(responseBody.data[0], initialUsersRecords[0]);
      expect(responseBody.data.result).toHaveLength(initialUsersRecords.length);
    });

    it('should provide paging', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(UsersController.prototype, 'find')
        .mockResolvedValue(
          Response.success({
            page: 1,
            size: 2,
            total: 5,
            result: [initialUsersRecords[0], initialUsersRecords[1]],
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const pagingEvent = { ...eventFindUser, queryStringParameters: { page: 1, size: 2 } };
      const response = await find(pagingEvent, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // eslint-disable-next-line no-console
      // console.log(responseBody.data, initialUsersRecords[0]);
      expect(responseBody.data.page).toBe(1);
      expect(responseBody.data.size).toBe(2);
      expect(responseBody.data.result).toHaveLength(2);
      expect(responseBody.data.total).toBe(5);
    });
  });

  describe('findOne Users handler', () => {
    it('should properly find user by id', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(UsersController.prototype, 'findOne')
        .mockResolvedValue(
          Response.success(initialUsersRecords[0])
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await findOne({ ...eventFindUser, pathParameters: { id: initialUsersRecords[0].id } }, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.data.username).toStrictEqual(initialUsersRecords[0].username);
    });
  });

  describe('deleteOne Users handler', () => {
    it('should properly soft delete user by id', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(UsersController.prototype, 'deleteOne')
        .mockResolvedValue(
          Response.success(true)
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await deleteOne({ ...eventFindUser, pathParameters: { id: initialUsersRecords[0].id } }, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.data).toBe(true);
    });
  });
});
