# System usprawniający proces code review w zespole programistycznym
## This is a project for PWr KPZ  

### Backend

#### Terminal Run config:
- Clean build of backend application
```
./gradlew clean build
```
- Default run, active profile set in application.properties file - "spring.profiles.active=..." variable
```
./gradlew bootRun
```
- Run config with direct profile within instruction, here "test"
```
./gradlew bootRun --args='--spring.profiles.active=test'
```

#### Current env.properties file structure
```
dev.database.username=exampleUser
dev.database.password=examplePassword
dev.datasource.url=jdbc:postgresql://exampleHost:5432/exampleDatabase

test.database.username=sa
test.database.password=password
test.datasource.url=jdbc:h2:mem:testdb

env.personal.azure.token=exampleToken
env.azure.organization.name=KPZ-exampleOrg

env.jwt.private.key=classpath:example-private-key.pem
env.jwt.public.key=classpath:example-public-key.pem

env.security.endpoint.whitelist=exampleEnpoint1, exampleEndpoint2
env.security.cors.allowed.origins=http://exampleHost
env.security.cors.allowed.methods=exampleMethod1, exampleMethod2
```

### Frontned

#### Current .env file structure
```
REACT_APP_BASE_URL=http://exampleHost
REACT_APP_ENV={ENV_PROFILE}
```

__ENV_PROFILE__ may be one of the following:
- DEV - development profile 
- TEST - test profile with disabled security
- PROD - production profile

Instead of __.env__ file you can use __.env.local__ which will be ignored by git.

### Docker

#### Create docker container
Requirements:
- Docker installed
- Docker daemon running
- Docker compose installed
- Jar file with backend application
- .env file in deploy directory

Current __.env__ file structure
```shell
BACKEND_PORT={BACKEND_PORT}
FRONTEND_PORT={FRONTEND_PORT}
DATABASE_PORT={DATABASE_PORT}
DATABASE_NAME={DATABASE_NAME}
DATABASE_USER={DATABASE_USER}
DATABASE_PASSWORD={DATABASE_PASSWORD}
ORGANIZATION_NAME={ORGANIZATION_NAME}
ACCESS_TOKEN={ACCESS_TOKEN}
```

To create and run container run command:
```shell
docker-compose up -d
```
- d flag is optional and runs container in background