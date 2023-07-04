// import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import mongoose from 'mongoose';
import { Response } from '../../src/utils/message';
import { ServiceError } from '../../src/infra/ServiceError';

import {
  createRecordErrorString,
  eventCreateRecord,
  eventFindRecord,
  initialRecordsRecords,
} from '../records.mock';
import { contextCreateUser } from '../context.createUser.mock';
import {
  create,
  find,
  findOne,
  deleteOne,
} from '../../src/records_handler';
import { RecordsController } from '../../src/controller/records';

describe('integration testing - Records', () => {
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

  describe('create Record handler', () => {
    it('should properly create record', async () => {
      expect.hasAssertions();

      const mockedService = jest.spyOn(RecordsController.prototype, 'create')
        .mockResolvedValue(
          Response.created(JSON.parse(eventCreateRecord.body))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await create(eventCreateRecord, context, () => 0);
      // eslint-disable-next-line no-console
      // console.log(response);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(201);
      const responseBody = JSON.parse(response.body);
      const requestBody = JSON.parse(eventCreateRecord.body);
      expect(responseBody.data.amount).toStrictEqual(requestBody.amount);
      // eslint-disable-next-line no-underscore-dangle
      // createdId = responseBody._id;
    });
    it('should not properly create existing record', async () => {
      expect.hasAssertions();
      const mockedService = jest.spyOn(RecordsController.prototype, 'create')
        .mockResolvedValue(
          Response.error(new ServiceError({
            message: createRecordErrorString,
            code: 500,
          }))
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await create(eventCreateRecord, context, () => 0);
      // eslint-disable-next-line no-console
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(500);
      const responseBody = JSON.parse(response.body);
      // const requestBody = JSON.parse(eventCreateRecord.body);
      expect(responseBody.message).toStrictEqual(createRecordErrorString);
    });
  });

  describe('find Records handler', () => {
    it('should properly list records', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(RecordsController.prototype, 'find')
        .mockResolvedValue(
          Response.success({
            page: 1,
            size: 20,
            result: initialRecordsRecords,
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await find(eventFindRecord, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // eslint-disable-next-line no-console
      // console.log(responseBody.data[0], initialRecordsRecords[0]);
      expect(responseBody.data.result).toHaveLength(initialRecordsRecords.length);
    });

    it('should provide paging', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(RecordsController.prototype, 'find')
        .mockResolvedValue(
          Response.success({
            page: 1,
            size: 2,
            total: 2,
            result: [initialRecordsRecords[0], initialRecordsRecords[1]],
          })
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const pagingEvent = { ...eventFindRecord, queryStringParameters: { page: 1, size: 2 } };
      const response = await find(pagingEvent, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      // eslint-disable-next-line no-console
      // console.log(responseBody.data, initialRecordsRecords[0]);
      expect(responseBody.data.page).toBe(1);
      expect(responseBody.data.size).toBe(2);
      expect(responseBody.data.result).toHaveLength(2);
      expect(responseBody.data.total).toBe(2);
    });
  });

  describe('findOne Records handler', () => {
    it('should properly find record by id', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(RecordsController.prototype, 'findOne')
        .mockResolvedValue(
          Response.success(initialRecordsRecords[0])
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await findOne({ ...eventFindRecord, pathParameters: { id: initialRecordsRecords[0].id } }, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.data.amount).toStrictEqual(initialRecordsRecords[0].amount);
    });
  });

  describe('deleteOne Records handler', () => {
    it('should properly soft delete record by id', async () => {
      expect.hasAssertions();
      const mockedService = jest
        .spyOn(RecordsController.prototype, 'deleteOne')
        .mockResolvedValue(
          Response.success(true)
        );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const context = contextCreateUser as any;
      const response = await deleteOne({ ...eventFindRecord, pathParameters: { id: initialRecordsRecords[0].id } }, context, () => 0);
      expect(mockedService).toHaveBeenCalledTimes(1);
      expect(response.statusCode).toStrictEqual(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.data).toBe(true);
    });
  });
});
