import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {
  empleado = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    fechaNacimiento: '',
    curp: '',
    rfc: '',
    empresa: ''
  };
  esEdicion = false;

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.empleadoService.getEmpleadoById(+id).subscribe({
        next: (data) => {
          if (data.fechaNacimiento) {
            const fecha = new Date(data.fechaNacimiento);
            data.fechaNacimiento = fecha.toISOString().split('T')[0]; // Formato yyyy-MM-dd
          }
          this.empleado = data;
        },
        error: (err) => {
          console.error('Error al cargar empleado:', err);
          alert(`No se pudo cargar el empleado. Detalles: ${err.error || err.message}`);
        }
      });
    }
  }

  guardarEmpleado(): void {
    if (this.esEdicion) {
      const id = this.route.snapshot.paramMap.get('id');
      this.empleadoService.updateEmpleado(+id!, this.empleado).subscribe({
        next: () => {
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          console.error('Error al actualizar empleado:', err);
          alert('No se pudo actualizar el empleado.');
        }
      });
    } else {
      this.empleadoService.createEmpleado(this.empleado).subscribe({
        next: () => {
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          console.error('Error al crear empleado:', err);
          alert('No se pudo crear el empleado.');
        }
      });
    }
  }
}
