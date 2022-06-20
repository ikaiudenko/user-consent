## User Consent

### High level architecture:
- Gateway
- User Service (gets/creates/deletes users. API endpoints are protected with APP_KEY and JWT bearer tokens)
- Event Service (gets/creates/deletes user events. API endpoints are protected with APP_KEY and JWT bearer tokens)
- Token Service (service creates/decodes/validate provided tokens)

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

### Environment Setup

1. Make sure you have installed Docker Engine.
2. Create .env file based on the example.
3. Run `docker-compose up`


### Swagger

http://localhost:3000/api/

