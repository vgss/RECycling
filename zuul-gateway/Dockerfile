FROM openjdk:latest
VOLUME /tmp
ADD "target/zuul-gateway-0.0.1-SNAPSHOT.jar" app.jar
ENTRYPOINT ["java","-jar","app.jar"]
EXPOSE 8050