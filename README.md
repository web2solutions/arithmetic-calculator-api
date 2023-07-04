
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
* MongoDB
* Redis
* Jest
* AWS lambda
* Eslint
* Docker
* serverless and serverless-offline

## Start development env using your current NodeJS installation:

You need to install the project first:

```bash
npm install
```

Before running start the API, you must have Mongo and Redis installed first.

You can manually install them, or, you can use docker to install it by running:

```bash
npm run docker:compose:daemon
```

You probably want to run the current test suite implementation:

```bash
npm test
```

An then you can start the dev environment by running:

```bash
npm run local:start:dev
```

## Start Mongo and Redis using Docker

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

## Testing

```bash
npm test
```

## Deploy



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

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

## Project Tech Debits

1. Improve code coverage
2. Implement test suite for unit testing.
3. Implement test suite for e2e testing.
4. Adopt the Data Repository Pattern.
5. 100% Ensure the SOLID principles.
6. Implement API documentation - swagger OAS.
