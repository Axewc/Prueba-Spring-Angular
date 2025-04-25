package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(name = "apellido_paterno")
    private String apellidoPaterno;

    @Column(name = "apellido_materno")
    private String apellidoMaterno;

    private String sexo;

    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    private String curp;

    private String rfc;

    @Column(name = "numero_empleado")
    private String numeroEmpleado;

    private String empresa;
}
