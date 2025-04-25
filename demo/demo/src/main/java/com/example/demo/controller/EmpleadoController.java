package com.example.demo.controller;

import com.example.demo.model.Empleado;
import com.example.demo.repository.EmpleadoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @GetMapping
    public List<Empleado> getAllEmpleados() {
        return empleadoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getEmpleadoById(@PathVariable Long id) {
        return empleadoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public List<Empleado> searchEmpleados(@RequestParam String nombre) {
        return empleadoRepository.findByNombreContaining(nombre);
    }

    @PostMapping
    public ResponseEntity<?> createEmpleado(@RequestBody @Valid Empleado empleado) {
        try {
            synchronized (this) {
                Integer maxNumeroEmpleado = empleadoRepository.findMaxNumeroEmpleado();
                int nextNumero = (maxNumeroEmpleado != null) ? maxNumeroEmpleado + 10 : 10;
                empleado.setNumeroEmpleado("E" + String.format("%04d", nextNumero));
            }
            Empleado savedEmpleado = empleadoRepository.save(empleado);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEmpleado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el empleado: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empleado> updateEmpleado(@PathVariable Long id, @RequestBody Empleado empleadoDetails) {
        return empleadoRepository.findById(id)
                .map(empleado -> {
                    empleado.setNombre(empleadoDetails.getNombre());
                    empleado.setApellidoPaterno(empleadoDetails.getApellidoPaterno());
                    empleado.setApellidoMaterno(empleadoDetails.getApellidoMaterno());
                    empleado.setSexo(empleadoDetails.getSexo());
                    empleado.setFechaNacimiento(empleadoDetails.getFechaNacimiento());
                    empleado.setCurp(empleadoDetails.getCurp());
                    empleado.setRfc(empleadoDetails.getRfc());
                    empleado.setNumeroEmpleado(empleadoDetails.getNumeroEmpleado());
                    empleado.setEmpresa(empleadoDetails.getEmpresa());
                    return ResponseEntity.ok(empleadoRepository.save(empleado));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable Long id) {
        if (empleadoRepository.existsById(id)) {
            empleadoRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}