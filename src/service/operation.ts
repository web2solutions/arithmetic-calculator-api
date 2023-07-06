import { Model } from 'mongoose';
import { CreateOperationDTO } from '../model/dto/createOperationDTO';
import { UpdateOperationDTO } from '../model/dto/updateOperationDTO';
import { OperationsDocument } from '../model';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { IPagingResponse } from '../infra/interface/IPagingResponse';

export class OperationsService {
  private operations: Model<OperationsDocument>;
  constructor(operations: Model<OperationsDocument>) {
    this.operations = operations;
  }

  protected async createOperation(params: CreateOperationDTO): Promise<OperationsDocument> {
    try {
      const result = await this.operations.create({
        type: params.type,
        cost: params.cost,
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

  protected async updateOperations(_id: string, data: UpdateOperationDTO): Promise<OperationsDocument | null> {
    try {
      const record = await this.operations.findOneAndUpdate(
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

  protected async findOperations(
    filters: Record<string, string|number> = {},
    paging: IPagingRequest
  ): Promise<IPagingResponse<Array<OperationsDocument>>> {
    let { page, size } = paging;
    page = page ? Math.round(page) : 1;
    size = size ? Math.round(size) : 20;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = {
      // status: 'active',
    };
    if (filters) {
      query = { ...filters, ...query };
    }
    delete query.status;
    try {
      const skip = (page * size) - size;
      const result = await this.operations.find(query).limit(size).skip(skip); // .sort( '-createdOn' )
      const total = await this.operations.count(query);
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

  protected async findOneOperationById(_id: string, showOnlyActive: boolean): Promise<OperationsDocument | null> {
    try {
      const filter: Record<string, string | number | boolean> = {
        _id,
      };
      if (showOnlyActive) {
        filter.status = 'active';
      }
      const record = await this.operations.findOne(filter);
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

  protected async deleteOneOperationById(_id: string): Promise<boolean> {
    try {
      await this.operations.findOneAndUpdate(
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
