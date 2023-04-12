FROM openjdk:17

WORKDIR /usr/src/app

ARG JAR_PATH=build/libs/app-0.0.1-SNAPSHOT.jar

COPY ${JAR_PATH} app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]
