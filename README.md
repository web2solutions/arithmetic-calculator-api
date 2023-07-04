
# Arithmetic Calculator API

This is a simple REST API built as coding challenge made for [TrueNorth](https://www.truenorth.co/).

See the [requirement's list](./TrueNorth_LoanPro_Coding_Challenge.pdf).

`CircleCI status:`

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/web2solutions/arithmetic-calculator-api/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/web2solutions/arithmetic-calculator-api/tree/main)

`Coverage`

<a href="https://codecov.io/gh/web2solutions/arithmetic-calculator-api" > 
 <img src="https://codecov.io/gh/web2solutions/arithmetic-calculator-api/branch/main/graph/badge.svg?token=MC5LUHIUGS"/> 
 </a>

[![codecov](https://codecov.io/gh/web2solutions/arithmetic-calculator-api/branch/main/graphs/sunburst.svg?token=MC5LUHIUGS)](https://codecov.io/web2solutions/arithmetic-calculator-api)



## Stack

* Node.js
* TypeScript
* MongoDB and Mongo Atlas as Database
* Redis and Redis Labs as Cache layer
* Jest
* AWS lambda
* Eslint
* Docker
* serverless and serverless-offline

## Preparing the development environment using your current NodeJS installation

You need to install the project first:

```bash
npm install
```

Before running the API, you must have Mongo and Redis installed first.

You can manually install them, or, you can use docker to install it by running:

```bash
npm run docker:compose:daemon
```

### Testing using local Mongo and Redis services

You probably want to run the current test suite implementation:

```bash
npm test:dev 
```

### Running the application on local environment

`It is recommended to set the NODE_ENV env var value to 'dev'`

```bash
export NODE_ENV=dev
```

Add some users and operations to the database:

```bash
npm run data:seed:dev
```

An then you can start the dev environment by running:

```bash
npm run local:start:dev
```

You can do login as admin user through the API by using curl:

```bash
curl -X POST http://localhost:3000/dev/users/login -H "Content-Type: application/json" -d '{"username": "admin@admin.com", "password": "123456"}'  
```

## Managing Mongo and Redis using Docker

```bash
npm run docker:compose:daemon
```

`Stop Docker environment`

```bash
npm run docker:stop
```

`Restart Docker environment`

```bash
npm run docker:restart
npm run docker:clean
```

`Clean Docker environment`

```bash
npm run docker:clean
```

## Testing on CI

When running on CI, the API connects to Mongo Atlas and Redis Labs. 


Please make sure you have the proper accounts. 

You can create free both accounts at https://redis.com/try-free/ and https://www.mongodb.com/cloud/atlas/register .


Setup the following env vars on CI platform:

```
  NODE_ENV=ci
  
  CODECOV_TOKEN=xxxxxxx # for codecov service
  
  TOKEN_KEY=mysecret # for jwt token

  REDIS_HOST_LABS="redis-16050.c10.us-east-1-2.ec2.cloud.redislabs.com"
  REDIS_PASSWORD_LABS="........"
  REDIS_PORT_LABS=16050

  MONGO_ATLAS_URL=mongodb+srv://username:password@cluster0.mie7dav.mongodb.net/?retryWrites=true&w=majority
  MONGO_DATABASE=arithmetic_calculator_api
```

Run the default `npm test command` to run the test suite for CI.

```bash
npm test
```

## Deploy


### Environment Config

By default the application will assume the following stage names and config files:

- test
- prod
- stg

Each one of those will required a related config file:

- ./config/.env.test
- ./config/.env.prod
- ./config/.env.stg


With the following template:

```
TOKEN_KEY=mysecret

REDIS_HOST_LABS="redis-16050.c10.us-east-1-2.ec2.cloud.redislabs.com"
REDIS_PASSWORD_LABS="password"
REDIS_PORT_LABS=16050

MONGO_ATLAS_URL=mongodb+srv://username:password@cluster0.mie7dav.mongodb.net/?retryWrites=true&w=majority
MONGO_DATABASE=arithmetic_calculator_api
```



### Deploy on AWS, simply run:

```bash
$ npm run deploy

# or

$ serverless deploy
```



## Usage

send an HTTP request directly to the endpoint using a tool like curl

```
curl https://xxxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/users
```

## Scaling

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 1000. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

## Project Tech Debits

1. Improve code coverage
2. Implement test suite for unit testing.
3. Implement test suite for e2e testing.
4. Adopt the Data Repository Pattern.
5. 100% Ensure the SOLID principles.
6. Implement API documentation - swagger OAS.
