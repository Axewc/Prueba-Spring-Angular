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
('Juan', 'Pérez', 'Gómez', 'M', '1990-01-01', 'PERJ900101HDFRRZ01', 'PERJ900101ABC', 'E0010', 'Prolosys'),
('María', 'López', 'Martínez', 'F', '1985-05-15', 'LOPM850515HDFRRZ02', 'LOPM850515DEF', 'E0011', 'Prolosys'),
('Carlos', 'Hernández', 'Ruiz', 'M', '1992-03-22', 'HERC920322HDFRRZ03', 'HERC920322GHI', 'E0012', 'Prolosys'),
('Ana', 'García', 'Sánchez', 'F', '1988-07-30', 'GASA880730HDFRRZ04', 'GASA880730JKL', 'E0013', 'Prolosys'),
('Luis', 'Martínez', 'Torres', 'M', '1995-11-10', 'MATL951110HDFRRL05', 'MATL951110MNO', 'E0014', 'Prolosys'),
('Sofía', 'Ramírez', 'Flores', 'F', '1993-09-18', 'RAFS930918HDFRRL06', 'RAFS930918PQR', 'E0015', 'Prolosys'),
('Miguel', 'Vázquez', 'Ortega', 'M', '1987-12-05', 'VAOM871205HDFRRL07', 'VAOM871205STU', 'E0016', 'Prolosys'),
('Laura', 'Jiménez', 'Castro', 'F', '1991-06-25', 'JICL910625HDFRRL08', 'JICL910625VWX', 'E0017', 'Prolosys'),
('Jorge', 'Morales', 'Pérez', 'M', '1989-04-14', 'MOPJ890414HDFRRL09', 'MOPJ890414YZA', 'E0018', 'Prolosys'),
('Elena', 'Cruz', 'Hernández', 'F', '1994-08-08', 'CRHE940808HDFRRL10', 'CRHE940808BCD', 'E0019', 'Prolosys'),
('Andrés', 'Gómez', 'Luna', 'M', '1996-02-19', 'GOLA960219HDFRRL11', 'GOLA960219EFG', 'E0020', 'Prolosys');