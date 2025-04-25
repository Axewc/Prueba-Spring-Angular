# Proyecto CRUD de Empleados

Este proyecto es un sistema CRUD para gestionar empleados utilizando Angular, Spring Boot y MySQL.

## Requisitos previos

1. **Node.js**: Instalar [Node.js](https://nodejs.org/) (incluye npm).
2. **Angular CLI**: Instalar Angular CLI globalmente:
   ```bash
   npm install -g @angular/cli
   ```
3. **Java**: Instalar JDK 17 o superior.
4. **Maven**: Instalar [Apache Maven](https://maven.apache.org/).
5. **MySQL**: Tener MySQL instalado y configurado.

## Configuración de la base de datos

1. Crear la base de datos ejecutando el script SQL:
   ```sql
   mysql -u root -p < c:\Users\ax201\sistema\create_empleados_db.sql
   ```

2. Verificar que las credenciales de la base de datos en `application.properties` sean correctas:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=210622
   ```

## Instrucciones para correr el backend (Spring Boot)

1. Navegar al directorio del backend:
   ```bash
   cd c:\Users\ax201\sistema\demo\demo
   ```

2. Compilar y ejecutar el proyecto con Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

3. El backend estará disponible en `http://localhost:8080`.

## Instrucciones para correr el frontend (Angular)

1. Navegar al directorio del frontend:
   ```bash
   cd c:\Users\ax201\sistema\frontend
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. El frontend estará disponible en `http://localhost:4200`.

## Notas adicionales

- Asegúrate de que el backend esté corriendo antes de interactuar con el frontend.
- Si necesitas cambiar el puerto del backend o frontend, actualiza las configuraciones correspondientes en los archivos `application.properties` y `angular.json`.

- Para probar las funcionalidades del CRUD, debes acceder a las rutas:
    - `/empleados` para listar empleados.
    - `/empleados/nuevo` para agregar un nuevo empleado.
    - `/empleados/editar/:id` para editar un empleado existente.
    - `/empleados/eliminar/:id` para eliminar un empleado.