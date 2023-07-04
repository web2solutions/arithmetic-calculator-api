import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Model } from 'mongoose';
import { Response } from '../utils/message';
import { OperationsService } from '../service/operation';
import { CreateOperationDTO } from '../model/dto/createOperationDTO';
import { UpdateOperationDTO } from '../model/dto/updateOperationDTO';
import { HTTPNotFoundError } from '../infra/protocols/HTTP/error/HTTPNotFoundError';
import { OperationsDocument } from '../model/operations';
import { ServiceError } from '../infra/ServiceError';
import { setFilter } from '../utils/setFilter';
import { setPaging } from '../utils/setPaging';
import { IPagingRequest, IIdentity } from '../infra/interface';

export class OperationsController extends OperationsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(operations: Model<OperationsDocument>) {
    super(operations);
  }

  public async create(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!identity.user.admin) {
        throw new ServiceError({
          code: 403,
          message: 'only admins can create operations',
        });
      }
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

  public async update(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!identity.user.admin) {
        throw new ServiceError({
          code: 403,
          message: 'only admins can update operations',
        });
      }
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

  public async find(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      const filters = setFilter(event);
      const paging = setPaging(event);
      if (!identity.user.admin) {
        filters.status = 'active';
      }
      const result = await this.findOperations({ ...filters }, paging as IPagingRequest);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async findOne(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
      }
      const result = await this.findOneOperationById(id, !identity.user.admin);
      if (result === null) {
        throw new HTTPNotFoundError();
      }
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async deleteOne(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!identity.user.admin) {
        throw new ServiceError({
          code: 403,
          message: 'only admins can delete operations',
        });
      }
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      const result = await this.deleteOneOperationById(id);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
}
