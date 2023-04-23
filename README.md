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
- DEV - development profile with disabled security
- TEST - test profile
- PROD - production profile

Instead of __.env__ file you can use __.env.local__ which will be ignored by git.