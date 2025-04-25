package com.example.demo.repository;

import com.example.demo.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    List<Empleado> findByNombreContaining(String nombre);

    @Query("SELECT MAX(CAST(SUBSTRING(e.numeroEmpleado, 2) AS int)) FROM Empleado e")
    Integer findMaxNumeroEmpleado();
}
