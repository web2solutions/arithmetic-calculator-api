import dotenv from 'dotenv';
import path from 'path';
import { JwtService, IJwtService } from '../src/service/JwtService';

export const ENV = process.env.NODE_ENV || '';

export const configFile = `config/.env.${ENV}`;
export const dConfig = {
  path: path.resolve(process.cwd(), configFile),
};
dotenv.config(dConfig);

const jwtService: IJwtService = new JwtService(process.env.TOKEN_KEY);

export const initialUsersRecords = [{
  _id: '6498faa6c8b7ab0fdd68cea5',
  username: 'admin@admin.com',
  password: '123456',
  status: 'active',
  admin: true,
  __v: 0,
  id: '6498faa6c8b7ab0fdd68cea5',
},
{
  _id: '6498fba26c94b7f12a4323d0',
  username: 'user1@user.com',
  password: '123456',
  status: 'active',
  __v: 0,
  id: '6498fba26c94b7f12a4323d0',
},
{
  _id: '6498fba76c94b7f12a4323d6',
  username: 'user20@user.com',
  password: '123456',
  status: 'active',
  __v: 0,
  id: '6498fba76c94b7f12a4323d6',
},
{
  _id: '6498fbab6c94b7f12a4323d8',
  username: 'user30@user.com',
  password: '123456',
  status: 'active',
  __v: 0,
  id: '6498fbab6c94b7f12a4323d8',
},
{
  _id: '6498fbb16c94b7f12a4323da',
  username: 'user40@user.com',
  password: '123456',
  status: 'active',
  __v: 0,
  id: '6498fbb16c94b7f12a4323da',
}];

export const adminToken = jwtService.generateToken(initialUsersRecords[0]);

export const createUsername = `user${Math.random()}@user.com`;
export const createUsername2 = `user${Math.random()}@user.com`;
export const createUsername3 = `user${Math.random()}@user.com`;

export const createUser = {
  _id: '6498fba26c94b7f12a4323d0',
  username: createUsername,
  password: '123456',
  status: 'active',
  __v: 0,
  id: '6498fba26c94b7f12a4323d0',
};

export const createUser2 = {
  _id: '6498fba76c94b7f12a4323d6',
  username: createUsername2,
  password: 'password',
  status: 'active',
  __v: 0,
  id: '6498fba76c94b7f12a4323d6',
};

export const createUser3 = {
  _id: '6498fbb16c94b7f12a4323da',
  username: createUsername3,
  password: 'password',
  status: 'active',
  __v: 0,
  id: '6498fbb16c94b7f12a4323da',
};

// eslint-disable-next-line no-useless-escape
export const createUserErrorString = `E11000 duplicate key error collection: arithmetic-calculator-api.users index: username_1 dup key: { username: \"${createUsername}\" }`;
// eslint-disable-next-line no-useless-escape
export const updateUserErrorString = `E11000 duplicate key error collection: arithmetic-calculator-api.users index: username_1 dup key: { username: \"${createUsername}\" }`; //

export const recordCreateUserString = JSON.stringify(createUser);
export const recordCreateUser2String = JSON.stringify(createUser2);
export const recordCreateUser3String = JSON.stringify(createUser3);

export const eventCreateUser = {
  body: recordCreateUserString,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.29.2',
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
    'User-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/users',
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
      user: 'offlineContext_user',
      userAgent: 'PostmanRuntime/7.29.2',
      userArn: 'offlineContext_userArn',
    },
    operationName: undefined,
    path: '/users',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/users',
    stage: 'dev',
  },
  resource: '/users',
  stageVariables: null,
};

export const eventLoginAdmin = {
  ...eventCreateUser,
  body: JSON.stringify({
    username: 'admin@admin.com',
    password: '123456',
  }),
};

export const eventLogoutAdmin = {
  ...eventCreateUser,
  body: JSON.stringify({
    username: 'admin@admin.com',
    token: adminToken,
  }),
};

export const loginResponse = {
  code: 0,
  message: 'success',
  data: {
    _id: '6498faa6c8b7ab0fdd68cea5',
    username: 'admin@admin.com',
    status: 'active',
    token: adminToken,
    balance: 100,
    admin: true,
    __v: 0,
    id: '6498faa6c8b7ab0fdd68cea5',
  },
};

export const eventUpdateUserPassword = {
  body: JSON.stringify({
    password: 'james',
  }),
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.29.2',
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
    'User-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/users',
  pathParameters: {
    // eslint-disable-next-line no-underscore-dangle
    id: createUser._id,
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
      user: 'offlineContext_user',
      userAgent: 'PostmanRuntime/7.29.2',
      userArn: 'offlineContext_userArn',
    },
    operationName: undefined,
    path: '/users',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/users',
    stage: 'dev',
  },
  resource: '/users',
  stageVariables: null,
};

export const eventUpdateUserUsername = {
  body: JSON.stringify({
    username: Math.random() + createUsername,
  }),
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.29.2',
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
    'User-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/users',
  pathParameters: {
    // eslint-disable-next-line no-underscore-dangle
    id: createUser._id,
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
      user: 'offlineContext_user',
      userAgent: 'PostmanRuntime/7.29.2',
      userArn: 'offlineContext_userArn',
    },
    operationName: undefined,
    path: '/users',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/users',
    stage: 'dev',
  },
  resource: '/users',
  stageVariables: null,
};

export const eventUpdateExistingUserUsername = {
  body: JSON.stringify({
    username: createUsername,
  }),
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'PostmanRuntime/7.29.2',
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
    'User-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['685b9667-31d0-4552-bd2c-10bba79a5b90'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
    'Content-Length': ['93'],
  },
  multiValueQueryStringParameters: null,
  path: '/users',
  pathParameters: {
    // eslint-disable-next-line no-underscore-dangle
    id: createUser._id,
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
      user: 'offlineContext_user',
      userAgent: 'PostmanRuntime/7.29.2',
      userArn: 'offlineContext_userArn',
    },
    operationName: undefined,
    path: '/users',
    protocol: 'HTTP/1.1',
    requestId: '0d890b2b-f2be-43ee-8559-db9f37b1b616',
    requestTime: '26/Jun/2023:01:04:14 -0300',
    requestTimeEpoch: 1687752254757,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/users',
    stage: 'dev',
  },
  resource: '/users',
  stageVariables: null,
}; // eventUpdateUserUsername, eventUpdateExistingUserUsername

export const eventFindUser = {
  body: null,
  headers: {
    'User-Agent': 'PostmanRuntime/7.29.2',
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
    'User-Agent': ['PostmanRuntime/7.29.2'],
    Accept: ['*/*'],
    'Postman-Token': ['e723484d-1e1a-4349-adb1-36abe0ed67bb'],
    Host: ['localhost:3000'],
    'Accept-Encoding': ['gzip, deflate, br'],
    Connection: ['keep-alive'],
  },
  multiValueQueryStringParameters: null,
  path: '/users',
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
      user: 'offlineContext_user',
      userAgent: 'PostmanRuntime/7.29.2',
      userArn: 'offlineContext_userArn',
    },
    operationName: undefined,
    path: '/users',
    protocol: 'HTTP/1.1',
    requestId: '47d229f6-d0eb-493b-bb45-611e58858011',
    requestTime: '26/Jun/2023:16:16:05 -0300',
    requestTimeEpoch: 1687806965911,
    resourceId: 'offlineContext_resourceId',
    resourcePath: '/dev/users',
    stage: 'dev',
  },
  resource: '/users',
  stageVariables: null,
};
