FROM openjdk:17-jdk-alpine
COPY build/libs/code-review-helper-0.0.1-SNAPSHOT.jar backend.jar
EXPOSE 8080
ENTRYPOINT exec java -jar backend.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar backend.jar
