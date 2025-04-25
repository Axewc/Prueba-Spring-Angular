import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-detalle-empleado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
        console.error('Error al obtener empleados:', err);
        alert('No se pudo conectar con el servidor. Verifica que el backend esté en ejecución.');
      }
    });
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe({
        next: () => {
          this.empleados = this.empleados.filter(e => e.id !== id);
          alert('Empleado eliminado correctamente.');
        },
        error: (err) => {
          console.error('Error al eliminar empleado:', err);
          alert('No se pudo eliminar el empleado.');
        }
      });
    }
  }
}
