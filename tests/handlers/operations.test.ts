// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import mongoose from 'mongoose';
import { Response } from '../../src/utils/message';
import { ServiceError } from '../../src/infra/ServiceError';

import {
  createOperationErrorString,
  eventCreateOperation,
  eventUpdateOperationCost,
  eventUpdateExistingOperationOperationname,
  eventFindOperation,
  updateOperationErrorString,
  initialOperationsRecords,
} from '../operations.mock';
import { contextCreateUser } from '../context.createUser.mock';
import {
  create,
  update,
  find,
  findOne,
  deleteOne,
} from '../../src/operations_handler';
import { OperationsController } from '../../src/controller/operations';

describe('integration testing - Operations', () => {
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

  describe('create Operation handler', () => {
    it('should properly create operation', async () => {
      expect.hasAssertions();

      const mockedService = jest.spyOn(OperationsController.prototype, 'create')
        .mockResolvedValue(
          Response.created(JSON.parse(eventCreateOperation.body))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await create(eventCreateOperation, context, () => 0);
      // eslint-disable-next-line no-console
      // console.log(response);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(201);
      const responseBody = JSON.parse(response.body);
      const requestBody = JSON.parse(eventCreateOperation.body);
      expect(responseBody.data.cost).toStrictEqual(requestBody.cost);
      // eslint-disable-next-line no-underscore-dangle
      // createdId = responseBody._id;
    });
    it('should not properly create existing operation', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(OperationsController.prototype, 'create')
        .mockResolvedValue(
          Response.error(new ServiceError({
            message: createOperationErrorString,
            code: 500,
          }))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await create(eventCreateOperation, context, () => 0);
      // eslint-disable-next-line no-console
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(500);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateOperation.body);
      expect(responseBody.message).toStrictEqual(createOperationErrorString);
    });
  });

  describe('update Operation handler', () => {
    it('should properly update operation cost', async () => {
      expect.hasAssertions();
      const originalRecord = JSON.parse(eventCreateOperation.body);
      const newPasswordRecord = JSON.parse(eventUpdateOperationCost.body);
      const mockedService = jest
        .spyOn(OperationsController.prototype, 'update')
        .mockResolvedValue(
          Response.success({ ...originalRecord, ...newPasswordRecord })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await update(eventUpdateOperationCost, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventUpdateOperationCost.body);
      expect(responseBody.data.cost).toStrictEqual(newPasswordRecord.cost);
    });
    it('should not properly update type and set an existing type', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(OperationsController.prototype, 'update').mockResolvedValue(
        Response.error(new ServiceError({
          message: updateOperationErrorString,
          code: 500,
        }))
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await update(eventUpdateExistingOperationOperationname, context, () => 0);
      // eslint-disable-next-line no-console
      // console.log(response);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(500);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateOperation.body);
      expect(responseBody.message).toStrictEqual(createOperationErrorString);
    });
  });

  describe('find Operations handler', () => {
    it('should properly list operations', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(OperationsController.prototype, 'find')
        .mockResolvedValue(
          Response.success({
            page: 1,
            size: 20,
            result: initialOperationsRecords,
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await find(eventFindOperation, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // eslint-disable-next-line no-console
      // console.log(responseBody.data[0], initialOperationsRecords[0]);
      expect(responseBody.data.result).toHaveLength(initialOperationsRecords.length);
    });

    it('should provide paging', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(OperationsController.prototype, 'find')
        .mockResolvedValue(
          Response.success({
            page: 1,
            size: 2,
            total: 2,
            result: [initialOperationsRecords[0], initialOperationsRecords[1]],
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const pagingEvent = { ...eventFindOperation, queryStringParameters: { page: 1, size: 2 } };
      const response = await find(pagingEvent, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // eslint-disable-next-line no-console
      // console.log(responseBody.data, initialOperationsRecords[0]);
      expect(responseBody.data.page).toBe(1);
      expect(responseBody.data.size).toBe(2);
      expect(responseBody.data.result).toHaveLength(2);
      expect(responseBody.data.total).toBe(2);
    });
  });

  describe('findOne Operations handler', () => {
    it('should properly find operation by id', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(OperationsController.prototype, 'findOne')
        .mockResolvedValue(
          Response.success(initialOperationsRecords[0])
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await findOne({ ...eventFindOperation, pathParameters: { id: initialOperationsRecords[0].id } }, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.data.type).toStrictEqual(initialOperationsRecords[0].type);
    });
  });

  describe('deleteOne Operations handler', () => {
    it('should properly soft delete operation by id', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(OperationsController.prototype, 'deleteOne')
        .mockResolvedValue(
          Response.success(true)
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await deleteOne({ ...eventFindOperation, pathParameters: { id: initialOperationsRecords[0].id } }, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.data).toBe(true);
    });
  });
});
