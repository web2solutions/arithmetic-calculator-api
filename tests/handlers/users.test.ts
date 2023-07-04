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
  eventLoginAdmin,
  loginResponse,
  eventLogoutAdmin,
  adminToken,
} from '../users.mock';
import { contextCreateUser } from '../context.createUser.mock';
import {
  create,
  update,
  find,
  findOne,
  deleteOne,
  login,
  logout,
  register,
} from '../../src/users_handler';
import { UsersController } from '../../src/controller/users';

describe('integration testing - Users', () => {
  // let createdId = '';
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    // jest.resetAllMocks();
  });

  // eslint-disable-next-line jest/no-hooks
  afterAll(async () => {
    if (mongoose.connection) {
      await mongoose.connection.close();
    }
  });

  describe('password protected handlers', () => {
    describe('unauthenticated requests', () => {
      it('should not properly create user', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await create({ ...eventCreateUser, headers: { ...eventCreateUser.headers, Authorization: '' } }, context, () => 0);
        expect(response.statusCode).toStrictEqual(401);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('Unauthorized');
      });

      it('should not properly update user', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await update({ ...eventUpdateExistingUserUsername, headers: { ...eventUpdateExistingUserUsername.headers, Authorization: '' } }, context, () => 0);
        expect(response.statusCode).toStrictEqual(401);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('Unauthorized');
      });

      it('should not properly list users', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await find({ ...eventFindUser, headers: { ...eventFindUser.headers, Authorization: '' } }, context, () => 0);
        expect(response.statusCode).toStrictEqual(401);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('Unauthorized');
      });

      it('should not properly find one user', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await findOne({
          ...eventFindUser,
          pathParameters: { id: initialUsersRecords[0].id },
          headers: { ...eventFindUser.headers, Authorization: '' },
        }, context, () => 0);
        expect(response.statusCode).toStrictEqual(401);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('Unauthorized');
      });

      it('should not properly delete user', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await deleteOne({
          ...eventFindUser,
          pathParameters: { id: initialUsersRecords[0].id },
          headers: { ...eventFindUser.headers, Authorization: '' },
        }, context, () => 0);
        expect(response.statusCode).toStrictEqual(401);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('Unauthorized');
      });
    });
    describe('create user handler', () => {
      // let token = '';
      it('should properly create user', async () => {
        expect.hasAssertions();

        const mockedService = jest.spyOn(UsersController.prototype, 'create')
          .mockResolvedValue(
            Response.created(JSON.parse(eventCreateUser.body))
          );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await create(eventCreateUser, context, () => 0);
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(201);
        const responseBody = JSON.parse(response.body);
        const requestBody = JSON.parse(eventCreateUser.body);
        expect(responseBody.data.password).toStrictEqual(requestBody.password);
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
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(500);
        const responseBody = JSON.parse(response.body);
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
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
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
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(500);
        const responseBody = JSON.parse(response.body);
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
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username must be a valid email address');
      });
    });

    describe('find user handler', () => {
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
        expect(responseBody.data.page).toBe(1);
        expect(responseBody.data.size).toBe(2);
        expect(responseBody.data.result).toHaveLength(2);
        expect(responseBody.data.total).toBe(5);
      });
    });

    describe('findOne user handler', () => {
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

    describe('deleteOne user handler', () => {
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

  describe('not protected handlers', () => {
    describe('register user handler', () => {
      it('should properly register user', async () => {
        expect.hasAssertions();

        const mockedService = jest.spyOn(UsersController.prototype, 'register')
          .mockResolvedValue(
            Response.created(JSON.parse(eventCreateUser.body))
          );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await register(eventCreateUser, context, () => 0);
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(201);
        const responseBody = JSON.parse(response.body);
        const requestBody = JSON.parse(eventCreateUser.body);
        expect(responseBody.data.password).toStrictEqual(requestBody.password);
      });
      it('should not properly register existing user', async () => {
        expect.hasAssertions();
        const mockedService = jest.spyOn(UsersController.prototype, 'register')
          .mockResolvedValue(
            Response.error(new ServiceError({
              message: createUserErrorString,
              code: 500,
            }))
          );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await register(eventCreateUser, context, () => 0);
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(500);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual(createUserErrorString);
      });
      it('should not properly register user with invalid username', async () => {
        expect.hasAssertions();
        const mockedService = jest.spyOn(UsersController.prototype, 'register')
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
        const response = await register(originalRecord, context, () => 0);
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username must be a valid email address');
      });
    });

    describe('login user handler', () => {
      it('should do login with admin user', async () => {
        expect.hasAssertions();

        const mockedService = jest.spyOn(UsersController.prototype, 'login')
          .mockResolvedValue(
            Response.success(loginResponse.data)
          );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await login(eventLoginAdmin, context, () => 0);
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(200);
        const responseBody = JSON.parse(response.body);
        const requestBody = JSON.parse(eventLoginAdmin.body);
        expect(responseBody.data.username).toStrictEqual(requestBody.username);
        expect(responseBody.data.admin).toBe(true);
      });
      it('should not do login with empty username', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const httpEvent = {
          ...eventLoginAdmin,
          body: JSON.stringify({
            password: '123456',
          }),
        };
        const response = await login(httpEvent, context, () => 0);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username and password are mandatory');
      });

      it('should not do login with empty password', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const httpEvent = {
          ...eventLoginAdmin,
          body: JSON.stringify({
            username: initialUsersRecords[0].username,
          }),
        };
        const response = await login(httpEvent, context, () => 0);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username and password are mandatory');
      });

      it('should not do login with invalid username', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const httpEvent = {
          ...eventLoginAdmin,
          body: JSON.stringify({
            username: 'invalid_email',
            password: '123456',
          }),
        };
        const response = await login(httpEvent, context, () => 0);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username must be a valid email address');
      });
    });

    describe('logout user handler', () => {
      it('should do logout with admin user', async () => {
        expect.hasAssertions();

        const mockedService = jest.spyOn(UsersController.prototype, 'logout')
          .mockResolvedValue(
            Response.success(true)
          );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const response = await logout(eventLogoutAdmin, context, () => 0);
        expect(mockedService).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toStrictEqual(200);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.data).toBe(true);
      });
      it('should not do logout with empty username', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const httpEvent = {
          ...eventLogoutAdmin,
          body: JSON.stringify({
            token: adminToken,
          }),
        };
        const response = await logout(httpEvent, context, () => 0);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username and token are mandatory');
      });

      it('should not do logout with empty password', async () => {
        expect.hasAssertions();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const context = contextCreateUser as any;
        const httpEvent = {
          ...eventLogoutAdmin,
          body: JSON.stringify({
            username: initialUsersRecords[0].username,
          }),
        };
        const response = await logout(httpEvent, context, () => 0);
        expect(response.statusCode).toStrictEqual(400);
        const responseBody = JSON.parse(response.body);
        expect(responseBody.message).toStrictEqual('username and token are mandatory');
      });
    });
  });
});
