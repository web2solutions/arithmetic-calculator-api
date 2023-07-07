/* eslint-disable camelcase */
import { Model } from 'mongoose';
import { CreateRecordDTO } from '../model/dto/createRecordDTO';
import { UpdateRecordDTO } from '../model/dto/updateRecordDTO';
import {
  RecordsDocument,
  OperationsDocument,
  EOperationType,
  UsersDocument,
} from '../model';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest, IRandomService, IPagingResponse } from '../infra/interface';

export class RecordsService {
  private records: Model<RecordsDocument>;
  private operations: Model<OperationsDocument>;
  private users: Model<UsersDocument>;
  private randomService: IRandomService;
  constructor(
    records: Model<RecordsDocument>,
    operations: Model<OperationsDocument>,
    users: Model<UsersDocument>,
    RandomService: IRandomService,
  ) {
    this.records = records;
    this.operations = operations;
    this.users = users;
    this.randomService = RandomService;
  }

  // eslint-disable-next-line class-methods-use-this
  protected calculateOperationResponse(type: EOperationType, params: CreateRecordDTO): string | number {
    let operation_response: number | string = '';
    // operator
    if (type === EOperationType.addition) {
      operation_response = (+params.user_input_numbers[0]) + (+params.user_input_numbers[1]);
    } else if (type === EOperationType.division) {
      operation_response = (+params.user_input_numbers[0]) / (+params.user_input_numbers[1]);
    } else if (type === EOperationType.multiplication) {
      operation_response = (+params.user_input_numbers[0]) * (+params.user_input_numbers[1]);
    } else if (type === EOperationType.subtraction) {
      operation_response = (+params.user_input_numbers[0]) - (+params.user_input_numbers[1]);
    } else if (type === EOperationType.squareRoot) {
      operation_response = Math.sqrt((+params.user_input_numbers[0]));
    }
    return operation_response;
  }

  protected async createRecord(params: CreateRecordDTO): Promise<RecordsDocument> {
    try {
      // get operation
      const operation: OperationsDocument | null = await this.operations.findOne({
        _id: params.operation_id,
        status: 'active',
      });

      if (!operation) {
        throw new Error('Operation not found, can not calculate.');
      }

      let operation_response: string | number;
      if (operation.type === EOperationType.randomString) {
        operation_response = await this.randomService.getRandom();
      } else {
        operation_response = this.calculateOperationResponse(operation.type, params);
      }
      // eslint-disable-next-line no-console
      // console.log(this.users);
      const user = await this.users.findOne({ _id: params.user_id });
      if (user) {
        if (user.balance >= operation.cost) {
          user.balance -= operation.cost;
          await user.save();
        } else {
          throw new ServiceError({
            message: 'Payment Required',
            code: 402,
          });
        }
      }

      const result = await this.records.create({
        user_id: params.user_id,
        operation_id: operation.id,
        amount: operation.cost,
        // user_balance: userBalance,
        user_input_numbers: params.user_input_numbers,
        operation_response,
      });

      return result;
    } catch (err: unknown) {
      if (err instanceof ServiceError) {
        throw new ServiceError(err);
      }
      throw err;
    }
  }

  protected async updateRecords(
    { id, user_id }: { id: string; user_id?: string },
    data: UpdateRecordDTO,
  ): Promise<RecordsDocument | null> {
    try {
      const filter: Record<string, string> = { _id: id };
      if (user_id) {
        filter.user_id = user_id;
      }
      const record: RecordsDocument | null = await this.records.findOneAndUpdate(
        filter,
        { $set: { status: data.status } },
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
      // status: 'active',
    };
    if (filters) {
      query = { ...filters, ...query };
    }
    try {
      const skip = (page * size) - size;
      const result = await this.records
        .find(query)
        .populate('user_id')
        .populate('operation_id')
        .limit(size)
        .skip(skip); // .sort( '-createdOn' )
      const total = await this.records.count(query);
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
        // status: 'active',
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

  protected async deleteOneRecordById(query: { id: string; user_id?: string }): Promise<boolean> {
    try {
      const filter: { _id: string; user_id?: string } = { _id: query.id };
      if (query.user_id) {
        filter.user_id = query.user_id;
      }
      await this.records.findOneAndUpdate(
        filter,
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
