import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-listar-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule], // Agregar RouterModule a imports
  templateUrl: './listar-empleados.component.html',
  styleUrls: ['./listar-empleados.component.css']
})
export class ListarEmpleadosComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (err) => {
        console.error('Error al obtener empleados:', err);
        alert('No se pudo conectar con el servidor. Verifica que el backend esté en ejecución y que CORS esté configurado correctamente.');
      }
    });
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(() => {
        this.empleados = this.empleados.filter(e => e.id !== id);
      });
    }
  }
}
