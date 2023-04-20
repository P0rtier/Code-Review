# System usprawniający proces code review w zespole programistycznym
## This is a project for PWr KPZ  

## Current env.properties file structure
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
