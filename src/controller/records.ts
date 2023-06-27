import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Model } from 'mongoose';
import { Response } from '../utils/message';
import { RecordsService } from '../service/record';
import { CreateRecordDTO } from '../model/dto/createRecordDTO';
import { UpdateRecordDTO } from '../model/dto/updateRecordDTO';
import { HTTPNotFoundError } from '../infra/protocols/HTTP/error/HTTPNotFoundError';
import { RecordsDocument } from '../model/records';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { setFilterAndPaging } from '../utils/setFilterAndPaging';

export class RecordsController extends RecordsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(records: Model<RecordsDocument>) {
    super(records);
  }

  public async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const params: CreateRecordDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const result = await this.createRecord({
        // _id: (new Types.ObjectId()) as unknown as string,
        user_id: params.user_id,
        operation_id: params.operation_id,
        amount: params.amount,
        user_balance: params.user_balance,
        user_input_numbers: params.user_input_numbers,
        operation_response: params.operation_response.toString(),
      } as CreateRecordDTO);
      return Response.created(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async update(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
      }
      const body: UpdateRecordDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const result = await this.updateRecords(id, body);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async find(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const [filter, paging] = setFilterAndPaging(event);
      const result = await this.findRecords({ ...filter }, paging as IPagingRequest);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async findOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.pathParameters) {
      throw new Error('invalid parameters');
    }
    const id: string = event.pathParameters.id || '';
    if (id === '') {
      throw new Error('invalid id');
    }
    try {
      const result = await this.findOneRecordById(id);
      if (result === null) {
        throw new HTTPNotFoundError();
      }
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async deleteOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.pathParameters) {
      throw new Error('invalid parameters');
    }
    const id: string = event.pathParameters.id || '';
    try {
      const result = await this.deleteOneRecordById(id);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
}
