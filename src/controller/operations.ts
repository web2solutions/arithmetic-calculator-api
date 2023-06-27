import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Model } from 'mongoose';
import { Response } from '../utils/message';
import { OperationsService } from '../service/operation';
import { CreateOperationDTO } from '../model/dto/createOperationDTO';
import { UpdateOperationDTO } from '../model/dto/updateOperationDTO';
import { HTTPNotFoundError } from '../infra/protocols/HTTP/error/HTTPNotFoundError';
import { OperationsDocument } from '../model/operations';
import { ServiceError } from '../infra/ServiceError';
import { IPagingRequest } from '../infra/interface/IPagingRequest';
import { setFilterAndPaging } from '../utils/setFilterAndPaging';

export class OperationsController extends OperationsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(operations: Model<OperationsDocument>) {
    super(operations);
  }

  public async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const params: CreateOperationDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const result = await this.createOperation({
        type: params.type,
        cost: params.cost,
      } as CreateOperationDTO);
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
      const body: UpdateOperationDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const result = await this.updateOperations(id, body);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async find(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const [filter, paging] = setFilterAndPaging(event);
      const result = await this.findOperations({ ...filter }, paging as IPagingRequest);
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
      const result = await this.findOneOperationById(id);
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
      const result = await this.deleteOneOperationById(id);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
}
