<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Description

This project is a collection of NestJS-based microservices for managing tips, authentication, logs, and API key subscriptions. Each microservice is designed to handle specific tasks while ensuring efficient and scalable server-side operations.

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Development](#development)
- [Watch mode](#watch-mode)
- [Production mode](#production-mode)
- [Test](#test)
- [Swagger Documentation](#swagger-documentation)
- [Microservices Overview](#microservices-overview)
- [Authentication Microservice](#authentication-microservice)
- [Logs Microservice](#logs-microservice)
- [API Key Subscription Microservice](#api-key-subscription-microservice)
- [Contribution](#contribution)
- [Support](#support)
- [Stay in touch](#stay-in-touch)
- [License](#license)

## Installation

To install the project, follow these steps:

1. Clone the repository:

```bash
$ git clone https://github.com/yourusername/yourrepository.git
```

2. Navigate to the project directory:

```bash
$ cd yourrepository
```

3. Install the dependencies:

```bash
$ npm install
```

## Running the app

Set the following environment variables in your `.env` file:

```dotenv
#* EXECUTION ENVIRONMENT (local | production)
ENVIRONMENT=local

# Local connection example: mongodb://localhost:27017/{DB_NAME_LOCAL}

DB_CONNECTION=mongodb://
DB_HOST_LOCAL=localhost:27017/
DB_NAME_LOCAL=your_local_db_name

# Production connection example: mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}{DB_HOST_REMOTE}/{DB_NAME_REMOTE}?retryWrites=true&w=majority

DB_HOST_REMOTE=your_remote_host
DB_NAME_REMOTE=your_remote_db_name
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

### Development

To start the application in development mode:

```bash
$ npm run start
```

### Watch mode

To start the application in watch mode (automatically restarts on code changes):

```bash
$ npm run start:dev
```

### Production mode

To start the application in production mode:

```bash
$ npm run start:prod
```

## Test

To run the tests, use the following commands:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Documentation

After starting the app, navigate to `http://localhost:3000/api` to view the Swagger documentation for the available endpoints. Swagger provides a detailed overview of each endpoint, including the request and response formats, parameters, and possible error codes.

## Microservices Overview

### Authentication Microservice

The Authentication Microservice handles X-API-Key authentication and user sessions. It ensures that requests are authenticated and authorized before accessing protected resources.

#### Endpoints

- `POST /auth/new` - Team for a new key permissions
- `POST /auth/validate` - Validate API key
- `POST /auth/cancel` - Team cancel api-key authentication

### Logs Microservice

The Logs Microservice records and manages application logs. It provides a way to track and monitor the application's behavior and performance.

#### Endpoints

- `GET /logs` - Retrieve application logs with optional filters
- `POST /logs` - Create a new log entry

### API Key Subscription Microservice

The API Key Subscription Microservice manages API key subscriptions, generating and validating keys based on user subscriptions.

#### Endpoints

- `POST /key-subscription` - Create a new API key subscription
- `GET /key-subscription` - Retrieve API key subscriptions
- `POST /key-subscription/validate` - Validate an API key
- `POST /key-subscription/cancel` - Cancel an API key subscription

## Contribution

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name (`feature/new-feature || feat/your-name` or `bugfix/fix-bug`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to your branch (`git push origin feature/new-feature`).
6. Create a pull request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## Support

This project is an MIT-licensed open source project. It grows thanks to the sponsors and support from the amazing community. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Cristian Manco](https://github.com/cristianManco)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
```

