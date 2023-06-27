import { Model } from 'mongoose';
import { CreateRecordDTO } from '../model/dto/createRecordDTO';
import { UpdateRecordDTO } from '../model/dto/updateRecordDTO';
import { RecordsDocument } from '../model';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { IPagingResponse } from '../infra/interface/IPagingResponse';

export class RecordsService {
  private records: Model<RecordsDocument>;
  constructor(records: Model<RecordsDocument>) {
    this.records = records;
  }

  protected async createRecord(params: CreateRecordDTO): Promise<RecordsDocument> {
    try {
      // eslint-disable-next-line no-console
      console.log({
        // eslint-disable-next-line no-underscore-dangle
        // _id: params._id,
        user_id: params.user_id,
        operation_id: params.operation_id,
        amount: params.amount,
        user_balance: params.user_balance,
        user_input_numbers: params.user_input_numbers,
        operation_response: params.operation_response,
      });
      const result = await this.records.create({
        // eslint-disable-next-line no-underscore-dangle
        // _id: params._id,
        user_id: params.user_id,
        operation_id: params.operation_id,
        amount: params.amount,
        user_balance: params.user_balance,
        user_input_numbers: params.user_input_numbers,
        operation_response: params.operation_response,
      });

      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async updateRecords(_id: string, data: UpdateRecordDTO): Promise<RecordsDocument | null> {
    try {
      const record = await this.records.findOneAndUpdate(
        { _id },
        { $set: data },
        { new: true },
      );
      return record;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async findRecords(
    filters: Record<string, string|number> = {},
    paging: IPagingRequest
  ): Promise<IPagingResponse<Array<RecordsDocument>>> {
    let { page, size } = paging;
    page = page ? Math.round(page) : 1;
    size = size ? Math.round(size) : 20;
    let query = {
      status: 'active',
    };
    if (filters) {
      query = { ...filters, ...query };
    }
    try {
      const skip = (page * size) - size;
      const result = await this.records.find(query).limit(size).skip(skip); // .sort( '-createdOn' )
      const total = await this.records.count();
      return {
        result, page, size, total,
      };
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async findOneRecordById(_id: string): Promise<RecordsDocument | null> {
    try {
      const record = await this.records.findOne({
        _id,
        status: 'active',
      });
      return record;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }

  protected async deleteOneRecordById(_id: string): Promise<boolean> {
    try {
      await this.records.findOneAndUpdate(
        {
          _id,
          status: 'active',
        },
        { $set: { status: 'inactive' } },
        { new: false },
      );
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new ServiceError({
          message: err.message,
        });
      }
      throw err;
    }
  }
}
