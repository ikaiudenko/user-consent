## User Consent

Preference Center for users where they can manage their choice regarding the channel they want to get notified on

### High level architecture:

- Gateway
- User Service
- Event Service
- Token Service

### DB Structure:

[Link](https://dbdiagram.io/d/62b0a29069be0b672c0599e2)

### Tech stack
- TypeScript
- NodeJs (NestJs framework)
- MySql 
- TypeORM
- REST API
- API Versioning
- API Throttling
- Logging
- Cache
- Swagger
- Eslint
- Formatter
- Pre-Commit GitHook

### Local Environment Setup

1. Make sure you have installed Docker Engine.
2. Create .env file based on the example.
3. Run `npm i` commands in the root/gateway/user-service/event-service/token-service directories. (You need to install npm modules in the root only if you plan to run linting/formatting commands)
4. Run `docker-compose up` in the root directory.

For the local environment you don't need to run migration. This is part of service start process.

### Production Environment Setup

1. Make sure you have installed Docker Engine.
2. Setup environment variables following `env_example`. 
3. Run `npm i` commands in the root/gateway/user-service/event-service/token-service directories. (You need to install npm modules in the root only if you plan to run linting/formatting commands)
4. Update Docker file in every service with new line in the bottom `CMD npm run build && npm run start:prod`.
5. Run DB migration using `npm run migration:run`.
6. Use `docker-compose up`.


### Swagger

http://localhost:3000/api/

### User Service Endpoints

API URL http://localhost:3000/users
1. `GET /users` - Gets user information. Only authorized user (use Bearer token) is able to perform request. 
1. `POST /users` - Creates user. Only authorized applications (use API_SECRET) are able to perform request. 
1. `DELETE /users` - Deletes user and its events. Only authorized applications (with API_SECRET) are able to perform request. 

### Event Service Endpoints

API URL http://localhost:3000/events

1. `POST /events` - Creates events for a user. Only authorized user (use Bearer token) is able to perform request.

### Code Linting and Formatting

Project [prettier](https://prettier.io/docs/en/install.html) and [estlint](https://www.npmjs.com/package/eslint) libraris as code base checker and formatter.
Once a developer makes a gti commit, [husky](https://www.npmjs.com/package/husky) does all code validations and if they fail the commit will be intercepted.

### Logger

All services use [winston](https://www.npmjs.com/package/winston) module. Services logger does logging in any format, adds additional logging criteria, which might be useful for search in elasticsearch systems. 

### Useful commands

1. List all docker containers `docker ps`.
1. Connect to docker container `docker exec -it <CONTAINER_NAME> sh`.
1. Stop all project containers `docker-compose down`.
1. Connect to the DB: use APP_MYSQL_HOST and MYSQL_PORT in your OS client (cli).
1. Run code formatting: `npm run format`.
1. Run code style check: `npm run lint`.
