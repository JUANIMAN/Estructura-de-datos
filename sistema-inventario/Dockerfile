# Etapa 1: Construcción
FROM maven:3.9.5-eclipse-temurin-21 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para Maven (para aprovechar el caché)
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copia el resto del código fuente
COPY src ./src

# Empaqueta el JAR
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:21-jdk

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo JAR del contenedor de construcción
COPY --from=build /app/target/*.jar app.jar

# Expone el puerto (opcional, ajusta según tu aplicación)
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
