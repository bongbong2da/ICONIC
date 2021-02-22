FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE=./target/*.jar
COPY ${JAR_FILE} iconic-backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar","-Dfile.encoding=UTF-8", "iconic-backend.jar"]