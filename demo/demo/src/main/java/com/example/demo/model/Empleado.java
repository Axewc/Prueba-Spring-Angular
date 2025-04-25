package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido paterno es obligatorio")
    @Column(name = "apellido_paterno")
    private String apellidoPaterno;

    @NotBlank(message = "El apellido materno es obligatorio")
    @Column(name = "apellido_materno")
    private String apellidoMaterno;

    @NotBlank(message = "El sexo es obligatorio")
    private String sexo;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser en el pasado")
    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @NotBlank(message = "El CURP es obligatorio")
    private String curp;

    @Size(max = 15, message = "El RFC no puede tener más de 15 caracteres")
    @NotBlank(message = "El RFC es obligatorio")
    private String rfc;

    @Size(max = 5, message = "El número de empleado debe tener exactamente 5 caracteres")
    @Column(name = "numero_empleado", unique = true, nullable = false)
    private String numeroEmpleado;

    @NotBlank(message = "La empresa es obligatoria")
    private String empresa;
}
