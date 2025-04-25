# Proyecto CRUD de Empleados

## Introducción

Este proyecto es un sistema CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de empleados. Está desarrollado utilizando **Angular** para el frontend, **Spring Boot** para el backend y **MySQL** como base de datos. El objetivo principal es proporcionar una interfaz intuitiva y funcional para administrar empleados en una organización.

---

## Tecnologías Utilizadas

### Frontend

- **Angular**: Framework para construir aplicaciones web dinámicas.
  - Uso de componentes standalone para simplificar la modularidad y reducir dependencias.
  - Enrutamiento dinámico con `RouterModule` para gestionar las vistas.
  - Uso de `HttpClient` para la comunicación con el backend.
  - Estilos personalizados con CSS.
- **TypeScript**: Lenguaje de programación utilizado en Angular.
  - Tipado estático para mayor seguridad y claridad en el desarrollo.
  - Uso de decoradores como `@Component` para definir la estructura de los componentes.

- **Angular CLI**:
  - Generación de componentes, servicios y módulos con comandos como `ng generate`.
  - Configuración de entornos de desarrollo y producción.

- **CSS**: Para el diseño y estilos empresariales.

### Backend

- **Spring Boot**: Framework para construir aplicaciones Java robustas y escalables.
  - Proyecto generado con [Spring Initializr](https://start.spring.io/), seleccionando dependencias clave como Spring Web, Spring Data JPA y MySQL.
  - Uso de controladores REST (`@RestController`) para exponer endpoints HTTP.
  - Validación de datos con anotaciones como `@NotBlank` y `@Size`.
  - Spring Data JPA para la gestión de la base de datos, facilitando operaciones CRUD con repositorios (`@Repository`).
- **Java**: Lenguaje de programación principal del backend.
  - Uso de JDK 17 para aprovechar las últimas características del lenguaje.
  - Gestión de dependencias con Maven.

### Base de Datos

- **MySQL**: Sistema de gestión de bases de datos relacional.
  - Diseño relacional para garantizar la integridad de los datos.
  - Uso de índices únicos en campos como `curp` y `numero_empleado` para evitar duplicados.

---

## Flujos de Trabajo y Decisiones de Diseño

### Frontend*

1. **Componentes Standalone**:
   - Decisión: Utilizar componentes standalone (`standalone: true`) para simplificar la estructura del proyecto y evitar la necesidad de módulos adicionales.
   - Ejemplo:

     ```typescript
     @Component({
       selector: 'app-crear-empleado',
       standalone: true,
       imports: [CommonModule, FormsModule, RouterModule],
       templateUrl: './crear-empleado.component.html',
       styleUrls: ['./crear-empleado.component.css']
     })
     export class CrearEmpleadoComponent { ... }
     ```

2. **Enrutamiento**:
   - Configuración de rutas en `app.routes.ts` para gestionar las vistas principales:

     ```typescript
     export const routes: Routes = [
       { path: '', redirectTo: 'empleados', pathMatch: 'full' },
       { path: 'empleados', component: ListarEmpleadosComponent },
       { path: 'empleados/nuevo', component: CrearEmpleadoComponent },
       { path: 'empleados/editar/:id', component: CrearEmpleadoComponent },
       { path: 'empleados/detalle', component: DetalleEmpleadoComponent }
     ];
     ```

3. **Comunicación con el Backend**:
   - Uso de `HttpClient` para realizar solicitudes HTTP:

     ```typescript
     getEmpleados(): Observable<any[]> {
       return this.http.get<any[]>(this.apiUrl);
     }
     ```

### Backend*

1. **Generación del Proyecto**:
   - Proyecto generado con Spring Initializr, seleccionando las siguientes dependencias:
     - **Spring Web**: Para construir APIs REST.
     - **Spring Data JPA**: Para interactuar con la base de datos.
     - **MySQL Driver**: Para la conexión con MySQL.

2. **Controladores REST**:
   - Uso de `@RestController` para exponer endpoints como:

     ```java
     @GetMapping
     public List<Empleado> getAllEmpleados() {
         return empleadoRepository.findAll();
     }
     ```

3. **Validación de Datos**:
   - Uso de anotaciones como `@NotBlank` y `@Size` en el modelo `Empleado`:

     ```java
     @NotBlank(message = "El nombre es obligatorio")
     private String nombre;

     @Size(max = 5, message = "El número de empleado debe tener exactamente 5 caracteres")
     @Column(name = "numero_empleado", unique = true, nullable = false)
     private String numeroEmpleado;
     ```

4. **Gestión de Dependencias**:
   - Uso de Maven para gestionar dependencias y configuraciones del proyecto:

     ```xml
     <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-jpa</artifactId>
     </dependency>
     ```

### Base de Datos*

1. **Diseño Relacional**:
   - Tabla `empleado` con los siguientes campos:
     - `id`: Clave primaria.
     - `curp` y `numero_empleado`: Índices únicos para garantizar la unicidad.
   - Decisión: Usar `AUTO_INCREMENT` para el campo `id` y generar el `numero_empleado` en el backend.

2. **Script de Creación**:
   - Script SQL para crear la base de datos y la tabla:

     ```sql
     CREATE TABLE empleado (
         id BIGINT AUTO_INCREMENT PRIMARY KEY,
         nombre VARCHAR(50) NOT NULL,
         ...
         numero_empleado VARCHAR(5) NOT NULL UNIQUE
     );
     ```

3. **Generación Automática del Número de Empleado**:
   - Implementación en el backend:

     ```java
     @PostMapping
     public ResponseEntity<?> createEmpleado(@RequestBody @Valid Empleado empleado) {
         Integer maxNumeroEmpleado = empleadoRepository.findMaxNumeroEmpleado();
         int nextNumero = (maxNumeroEmpleado != null) ? maxNumeroEmpleado + 10 : 10;
         empleado.setNumeroEmpleado("E" + String.format("%04d", nextNumero));
         empleadoRepository.save(empleado); // Guardar el empleado en la base de datos
         return ResponseEntity.status(HttpStatus.CREATED).body(empleado); // Retornar el empleado creado
     }
     ```

## Funcionalidades Principales

1. **Crear Empleado**:
   - Permite registrar un nuevo empleado con datos como nombre, apellidos, CURP, RFC, empresa, entre otros.
   - Genera automáticamente un número de empleado único con el formato `E####`.

2. **Listar Empleados**:
   - Muestra una tabla con los empleados registrados.
   - Incluye opciones para editar o eliminar empleados.

3. **Actualizar Empleado**:
   - Permite modificar los datos de un empleado existente.
   - Cambia dinámicamente el título de la página a "Actualizar Empleado".

4. **Eliminar Empleado**:
   - Elimina un empleado de la base de datos.
   - Disponible tanto en la vista principal como en la vista detallada.

5. **Vista Detallada**:
   - Muestra todos los campos de los empleados en una tabla más completa.

---

## Estructura del Proyecto

### Frontend**

Ubicación: `c:\Users\ax201\sistema\frontend`

- **Componentes**:
  - `ListarEmpleadosComponent`: Muestra la lista principal de empleados.
  - `CrearEmpleadoComponent`: Permite crear o actualizar empleados.
  - `DetalleEmpleadoComponent`: Muestra todos los campos de los empleados.
- **Servicios**:
  - `EmpleadoService`: Gestiona las solicitudes HTTP al backend.
- **Rutas**:
  - `/empleados`: Lista de empleados.
  - `/empleados/nuevo`: Crear un nuevo empleado.
  - `/empleados/editar/:id`: Editar un empleado existente.
  - `/empleados/detalle`: Vista detallada de empleados.

### Backend**

Ubicación: `c:\Users\ax201\sistema\demo\demo`

- **Controladores**:
  - `EmpleadoController`: Gestiona las solicitudes HTTP para las operaciones CRUD.
- **Modelos**:
  - `Empleado`: Representa la entidad de empleado en la base de datos.
- **Repositorios**:
  - `EmpleadoRepository`: Interactúa con la base de datos para realizar operaciones CRUD.

### Base de Datos**

Ubicación del script: `c:\Users\ax201\sistema\create_empleados_db.sql`

- **Tabla**: `empleado`
  - Campos: `id`, `nombre`, `apellido_paterno`, `apellido_materno`, `sexo`, `fecha_nacimiento`, `curp`, `rfc`, `numero_empleado`, `empresa`.
  - El campo `numero_empleado` se genera automáticamente con el formato `E####`.

---

## Configuración del Proyecto

### Backend***

1. **Compilación y Ejecución**:
    - Navegar al directorio del backend:

     ```bash
     cd c:\Users\ax201\sistema\demo\demo
     ```

    - Ejecutar el proyecto con Maven Wrapper:
    - Ejecutar el proyecto con Maven Wrapper:

     ```bash
     ./mvnw spring-boot:run
     ```

    - El backend estará disponible en `http://localhost:8080`.

2. **Configuración de CORS**:
   - Permitir solicitudes desde el frontend:

     ```properties
     spring.web.cors.allowed-origins=http://localhost:4200
     spring.web.cors.allowed-methods=GET,POST,PUT,DELETE
     ```

### Frontend***

1. **Ejecución del Servidor de Desarrollo**:

   - Navegar al directorio del frontend:
   - Navegar al directorio del frontend:

     ```bash
     cd c:\Users\ax201\sistema\frontend
     ```

   - Instalar dependencias y ejecutar:

     ```bash
     npm install
     ng serve
     ```

   - El frontend estará disponible en `http://localhost:4200`.

2. **Optimización para Producción**:
   - Generar una build optimizada:

     ```bash
     ng build --configuration production
     ```

### Base de Datos***

1. Crear la base de datos ejecutando el script SQL:

   ```bash
   mysql -u root -p < c:\Users\ax201\sistema\create_empleados_db.sql
   ```

---

## Notas Adicionales

- Asegúrate de que el backend esté corriendo antes de interactuar con el frontend.
- Si necesitas cambiar el puerto del backend o frontend, actualiza las configuraciones en los archivos `application.properties` y `angular.json`.
- El número de empleado se genera automáticamente con incrementos de 10, comenzando desde `E0010`.

---

## Conclusión

Este proyecto integra tecnologías modernas y prácticas de desarrollo para construir un sistema CRUD robusto y escalable. Las decisiones de diseño, como el uso de componentes standalone en Angular y la validación de datos en Spring Boot, garantizan una solución modular y fácil de mantener. Es una base sólida para proyectos empresariales más complejos.
