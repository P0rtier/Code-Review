# System usprawniający proces code review w zespole programistycznym

### Table of contents
* [General info](#general-info)
* [Backend](#backend)
    - [Terminal Run config](#terminal-run-config)
    - [Config file structure](#current-envproperties-file-structure)
    - [Requirements](#requirements-backend)
* [Frontend](#frontend)
    - [Run application](#run-application)
    - [Config file structure](#current-env-file-structure)
    - [Requirements](#requirements-frontend)
* [Docker](#docker)
    - [Create docker container](#create-docker-container)
    - [Configurations](#configurations)

### General info

Project for PWr KPZ.  
This project is a system that allows to improve code review process in programming team.  
It's main features are:
- suggestions of code reviewers based on aviablity
- assigning code reviewers to pull requests
- automatic code review notifications
- code review statistics

This project consists of two parts:
- Backend application written in Java with Spring Boot framework
- Frontend application written in TypeScript with React framework

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
SPRING_DATASOURCE_USER={exampleUser}
SPRING_DATASOURCE_PASSWORD={examplePassword}
SPRING_DATASOURCE_URL:postgresql://{exampleHost}:5432/{exampleDatabase}
SPRING_DATASOURCE_TEST_URL=jdbc:h2:mem:{exampleDatabase}
SPRING_AZURE_ACCESS_TOKEN={exampleToken}
SPRING_ORGANIZATION_NAME={exampleOrganizationName}
SPRING_CLIENT_URL={exampleClientUrl}
SPRING_REFRESH_TOKEN_EXPIRATION_DAYS={exampleDays}
SPRING_ACCESS_TOKEN_EXPIRATION_MINUTES={exampleMinutes}
```

#### Requirements (backend):
- Java 17 installed
- Gradle installed (optional)
- .env.properties file in backend/src/main/resources directory

### Frontend

#### Run application
To run frontend application run command:
```shell
npm start
```

#### Current .env file structure
```
REACT_APP_BASE_URL={REACT_APP_BASE_URL}
REACT_APP_ENV={REACT_APP_ENV}
```

__ENV_PROFILE__ may be one of the following:
- DEV - development profile 
- TEST - test profile with disabled security
- PROD - production profile

Instead of __.env__ file you can use __.env.local__ which will be ignored by git.

#### Requirements (frontend):
- Node.js v16.16 (LTS) installed
- npm installed
- .env file in frontend directory

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
REFRESH_TOKEN_EXPIRATION_DAYS={REFRESH_TOKEN_EXPIRATION_DAYS}
ACCESS_TOKEN_EXPIRATION_MINUTES={ACCESS_TOKEN_EXPIRATION_MINUTES}
AZURE_ACCESS_TOKEN={ACCESS_TOKEN}
```

__.env__ file is required to run container and should be placed in deploy directory, where docker-compose.yml file is located.

To create and run container run command:
```shell
docker-compose up -d
```
- d flag is optional and runs container in background

#### Configurations
If you are deplaying application using docker, local __.env__ file for frontend and __.env.properties__ file for backend are ignored. Instead of them, __.env__ file in deploy directory is used.