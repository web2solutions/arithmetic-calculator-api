import { adminToken } from './users.mock';

export const initialOperationsRecords = [{
  _id: '649f040d17b642d315192cf9', cost: 2, type: 'addition', status: 'active', id: '649f040d17b642d315192cf9',
},
{
  _id: '649f043e17b642d315192cff', cost: 2, type: 'subtraction', status: 'active', id: '649f043e17b642d315192cff',
},
{
  _id: '649f044b17b642d315192d01', cost: 3, type: 'multiplication', status: 'active', id: '649f044b17b642d315192d01',
},
{
  _id: '649f046617b642d315192d03', cost: 3, type: 'division', status: 'active', id: '649f046617b642d315192d03',
},
{
  _id: '649f047917b642d315192d05', cost: 10, type: 'square_root', status: 'active', id: '649f047917b642d315192d05',
},
{
  _id: '649f048b17b642d315192d07', cost: 20, type: 'random_string', status: 'active', id: '649f048b17b642d315192d07',
}];

export const createOperationType = 'division';
export const createOperationType2 = 'multiplication';
export const createOperationType3 = 'square_root';

export const createOperation = {
  _id: '6498fba26c94b7f12a4323d0',
  cost: 2,
  type: createOperationType,
  status: 'active',
  __v: 0,
  id: '6498fba26c94b7f12a4323d0',
};

export const createOperation2 = {
  _id: '6498fba76c94b7f12a4323d6',
  cost: 2,
  type: createOperationType2,
  status: 'active',
  __v: 0,
  id: '6498fba76c94b7f12a4323d6',
};

export const createOperation3 = {
  _id: '6498fbb16c94b7f12a4323da',
  cost: 2,
  type: createOperationType3,
  status: 'active',
  __v: 0,
  id: '6498fbb16c94b7f12a4323da',
};

// eslint-disable-next-line no-useless-escape
export const createOperationErrorString = `E11000 duplicate key error collection: arithmetic-calculator-api.operations index: type_1 dup key: { type: \"${createOperationType}\" }`;
// eslint-disable-next-line no-useless-escape
export const updateOperationErrorString = `E11000 duplicate key error collection: arithmetic-calculator-api.operations index: type_1 dup key: { type: \"${createOperationType}\" }`; //

export const recordCreateOperationString = JSON.stringify(createOperation);
export const recordCreateOperation2String = JSON.stringify(createOperation2);
export const recordCreateOperation3String = JSON.stringify(createOperation3);

export const eventCreateOperation = {
  body: recordCreateOperationString,
  headers: {
    'Content-Type': 'application/json',
    'Operation-Agent': 'PostmanRuntime/7.29.2',
    Accept: '*/*',
    'Postman-Token': '685b9667-31d0-4552-bd2c-10bba79a5b90',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '93',
    Authorization: `Bearer ${adminToken}`,
  },
  httpMethod: 'POST',
  isBase64Encoded: false,
  multiValueHeaders: {
    'Content-Type': ['application/json'],
    'Operation-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/operations',
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      claims: undefined,
      principalId: 'offlineContext_authorizer_principalId',
      scopes: undefined,
    },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    extendedRequestId: '7df0babb-5826-4c99-9f3b-543aa8fb4e1a',
    httpMethod: 'POST',
    identity: {
      accessKey: null,
      accountId: 'offlineContext_accountId',
      apiKey: 'offlineContext_apiKey',
      apiKeyId: 'offlineContext_apiKeyId',
      caller: 'offlineContext_caller',
      cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
      cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
      cognitoIdentityId: 'offlineContext_cognitoIdentityId',
      cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
      principalOrgId: null,
      sourceIp: '127.0.0.1',
      operation: 'offlineContext_operation',
      operationAgent: 'PostmanRuntime/7.29.2',
      operationArn: 'offlineContext_operationArn',
    },
    operationName: undefined,
    path: '/operations',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/operations',
    stage: 'dev',
  },
  resource: '/operations',
  stageVariables: null,
};

export const eventUpdateOperationCost = {
  body: JSON.stringify({
    cost: 3,
  }),
  headers: {
    'Content-Type': 'application/json',
    'Operation-Agent': 'PostmanRuntime/7.29.2',
    Accept: '*/*',
    'Postman-Token': '685b9667-31d0-4552-bd2c-10bba79a5b90',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '93',
    Authorization: `Bearer ${adminToken}`,
  },
  httpMethod: 'POST',
  isBase64Encoded: false,
  multiValueHeaders: {
    'Content-Type': ['application/json'],
    'Operation-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/operations',
  pathParameters: {
    // eslint-disable-next-line no-underscore-dangle
    id: createOperation._id,
  },
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      claims: undefined,
      principalId: 'offlineContext_authorizer_principalId',
      scopes: undefined,
    },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    extendedRequestId: '7df0babb-5826-4c99-9f3b-543aa8fb4e1a',
    httpMethod: 'POST',
    identity: {
      accessKey: null,
      accountId: 'offlineContext_accountId',
      apiKey: 'offlineContext_apiKey',
      apiKeyId: 'offlineContext_apiKeyId',
      caller: 'offlineContext_caller',
      cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
      cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
      cognitoIdentityId: 'offlineContext_cognitoIdentityId',
      cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
      principalOrgId: null,
      sourceIp: '127.0.0.1',
      operation: 'offlineContext_operation',
      operationAgent: 'PostmanRuntime/7.29.2',
      operationArn: 'offlineContext_operationArn',
    },
    operationName: undefined,
    path: '/operations',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/operations',
    stage: 'dev',
  },
  resource: '/operations',
  stageVariables: null,
};

export const eventUpdateOperationOperationname = {
  body: JSON.stringify({
    type: Math.random() + createOperationType,
  }),
  headers: {
    'Content-Type': 'application/json',
    'Operation-Agent': 'PostmanRuntime/7.29.2',
    Accept: '*/*',
    'Postman-Token': '685b9667-31d0-4552-bd2c-10bba79a5b90',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '93',
    Authorization: `Bearer ${adminToken}`,
  },
  httpMethod: 'POST',
  isBase64Encoded: false,
  multiValueHeaders: {
    'Content-Type': ['application/json'],
    'Operation-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/operations',
  pathParameters: {
    // eslint-disable-next-line no-underscore-dangle
    id: createOperation._id,
  },
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      claims: undefined,
      principalId: 'offlineContext_authorizer_principalId',
      scopes: undefined,
    },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    extendedRequestId: '7df0babb-5826-4c99-9f3b-543aa8fb4e1a',
    httpMethod: 'POST',
    identity: {
      accessKey: null,
      accountId: 'offlineContext_accountId',
      apiKey: 'offlineContext_apiKey',
      apiKeyId: 'offlineContext_apiKeyId',
      caller: 'offlineContext_caller',
      cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
      cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
      cognitoIdentityId: 'offlineContext_cognitoIdentityId',
      cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
      principalOrgId: null,
      sourceIp: '127.0.0.1',
      operation: 'offlineContext_operation',
      operationAgent: 'PostmanRuntime/7.29.2',
      operationArn: 'offlineContext_operationArn',
    },
    operationName: undefined,
    path: '/operations',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/operations',
    stage: 'dev',
  },
  resource: '/operations',
  stageVariables: null,
};

export const eventUpdateExistingOperationOperationname = {
  body: JSON.stringify({
    type: createOperationType,
  }),
  headers: {
    'Content-Type': 'application/json',
    'Operation-Agent': 'PostmanRuntime/7.29.2',
    Accept: '*/*',
    'Postman-Token': '685b9667-31d0-4552-bd2c-10bba79a5b90',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Length': '93',
    Authorization: `Bearer ${adminToken}`,
  },
  httpMethod: 'POST',
  isBase64Encoded: false,
  multiValueHeaders: {
    'Content-Type': ['application/json'],
    'Operation-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/operations',
  pathParameters: {
    // eslint-disable-next-line no-underscore-dangle
    id: createOperation._id,
  },
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      claims: undefined,
      principalId: 'offlineContext_authorizer_principalId',
      scopes: undefined,
    },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    extendedRequestId: '7df0babb-5826-4c99-9f3b-543aa8fb4e1a',
    httpMethod: 'POST',
    identity: {
      accessKey: null,
      accountId: 'offlineContext_accountId',
      apiKey: 'offlineContext_apiKey',
      apiKeyId: 'offlineContext_apiKeyId',
      caller: 'offlineContext_caller',
      cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
      cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
      cognitoIdentityId: 'offlineContext_cognitoIdentityId',
      cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
      principalOrgId: null,
      sourceIp: '127.0.0.1',
      operation: 'offlineContext_operation',
      operationAgent: 'PostmanRuntime/7.29.2',
      operationArn: 'offlineContext_operationArn',
    },
    operationName: undefined,
    path: '/operations',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/operations',
    stage: 'dev',
  },
  resource: '/operations',
  stageVariables: null,
}; // eventUpdateOperationOperationname, eventUpdateExistingOperationOperationname

export const eventFindOperation = {
  body: null,
  headers: {
    'Operation-Agent': 'PostmanRuntime/7.29.2',
    Accept: '*/*',
    'Postman-Token': 'e723484d-1e1a-4349-adb1-36abe0ed67bb',
    Host: 'localhost:3000',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    Authorization: `Bearer ${adminToken}`,
  },
  httpMethod: 'GET',
  isBase64Encoded: false,
  multiValueHeaders: {
    'Operation-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['e723484d-1e1a-4349-adb1-36abe0ed67bb'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
  },
  multiValueQueryStringParameters: null,
  path: '/operations',
  pathParameters: null,
  queryStringParameters: null,
  requestContext: {
    accountId: 'offlineContext_accountId',
    apiId: 'offlineContext_apiId',
    authorizer: {
      claims: undefined,
      principalId: 'offlineContext_authorizer_principalId',
      scopes: undefined,
    },
    domainName: 'offlineContext_domainName',
    domainPrefix: 'offlineContext_domainPrefix',
    extendedRequestId: '1dcd257f-056e-43e7-91ee-0024b68f65cb',
    httpMethod: 'GET',
    identity: {
      accessKey: null,
      accountId: 'offlineContext_accountId',
      apiKey: 'offlineContext_apiKey',
      apiKeyId: 'offlineContext_apiKeyId',
      caller: 'offlineContext_caller',
      cognitoAuthenticationProvider: 'offlineContext_cognitoAuthenticationProvider',
      cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
      cognitoIdentityId: 'offlineContext_cognitoIdentityId',
      cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
      principalOrgId: null,
      sourceIp: '127.0.0.1',
      operation: 'offlineContext_operation',
      operationAgent: 'PostmanRuntime/7.29.2',
      operationArn: 'offlineContext_operationArn',
    },
    operationName: undefined,
    path: '/operations',
    protocol: 'HTTP/1.1',
    requestId: '47d229f6-d0eb-493b-bb45-611e58858011',
    requestTime: '26/Jun/2023:16:16:05 -0300',
    requestTimeEpoch: 1687806965911,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/operations',
    stage: 'dev',
  },
  resource: '/operations',
  stageVariables: null,
};
