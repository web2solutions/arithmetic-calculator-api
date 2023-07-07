import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Model } from 'mongoose';
import { Response } from '../utils/message';
import { RecordsService } from '../service/record';
import { CreateRecordDTO } from '../model/dto/createRecordDTO';
import { UpdateRecordDTO } from '../model/dto/updateRecordDTO';
import { HTTPNotFoundError } from '../infra/protocols/HTTP/error/HTTPNotFoundError';
import { RecordsDocument, OperationsDocument, UsersDocument } from '../model';
import { ServiceError } from '../infra/ServiceError';
import { setFilter } from '../utils/setFilter';
import { setPaging } from '../utils/setPaging';
import { IPagingRequest, IIdentity, IRandomService } from '../infra/interface';

export class RecordsController extends RecordsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    records: Model<RecordsDocument>,
    operations: Model<OperationsDocument>,
    users: Model<UsersDocument>,
    RandomService: IRandomService
  ) {
    super(records, operations, users, RandomService);
  }

  public async create(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      const params: CreateRecordDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      // eslint-disable-next-line no-console
      // console.log('CREATE identity', identity);
      const result = await this.createRecord({
        user_id: identity.user.user_id,
        operation_id: params.operation_id,
        user_input_numbers: params.user_input_numbers,
      } as CreateRecordDTO);
      return Response.created(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async update(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
      }
      const body: UpdateRecordDTO = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      // eslint-disable-next-line camelcase
      const query: { id: string; user_id?: string } = { id };
      if (!identity.user.admin) {
        query.user_id = identity.user.user_id;
      }
      const result = await this.updateRecords(query, {
        status: body.status,
      });
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async find(event: APIGatewayProxyEvent, identity: IIdentity): Promise<APIGatewayProxyResult> {
    try {
      // identity.user.user_id
      // identity.user.admin
      // eslint-disable-next-line no-console
      // console.log('controller identity', identity);
      const filters = setFilter(event);
      const paging = setPaging(event);
      let query: Record<string, string|number> = { ...filters };
      if (!identity.user.admin) {
        query = { ...query, user_id: identity.user.user_id };
      }
      const result = await this.findRecords(query, paging as IPagingRequest);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }

  public async findOne(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      if (id === '') {
        throw new Error('invalid id');
      }
      const result = await this.findOneRecordById(id);
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
      if (!event.pathParameters) {
        throw new Error('invalid parameters');
      }
      const id: string = event.pathParameters.id || '';
      // eslint-disable-next-line camelcase
      const query: { id: string; user_id?: string } = {
        id,
      };
      if (!identity.user.admin) {
        query.user_id = identity.user.user_id;
      }
      const result = await this.deleteOneRecordById(query);
      return Response.success(result);
    } catch (err) {
      return Response.error(err as ServiceError);
    }
  }
}
