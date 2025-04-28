-- Eliminar la base de datos existente (si existe)
DROP DATABASE IF EXISTS empleados_db;

-- Crear la base de datos
CREATE DATABASE empleados_db;

-- Usar la base de datos recién creada
USE empleados_db;

-- Crear la tabla 'empleado'
CREATE TABLE empleado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(50) NOT NULL,
    apellido_materno VARCHAR(50) NOT NULL,
    sexo CHAR(1) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    curp VARCHAR(18) NOT NULL UNIQUE,
    rfc VARCHAR(15) NOT NULL UNIQUE, -- Aumentar longitud de 13 a 15
    numero_empleado VARCHAR(5) NOT NULL UNIQUE, -- Ajustar longitud a 5
    empresa VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO empleado (nombre, apellido_paterno, apellido_materno, sexo, fecha_nacimiento, curp, rfc, numero_empleado, empresa)
VALUES 
('Juan', 'Pérez', 'Gómez', 'M', '1990-01-01', 'PERJ900101HDFRRZ01', 'PERJ900101ABC', 'E0010', 'Prolosys');