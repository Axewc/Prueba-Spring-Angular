import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importar Router desde @angular/router
import { EmpleadoService } from '../empleado.service';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Agregar RouterModule a imports
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {
  empleado = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    sexo: '',
    fechaNacimiento: '',
    curp: '',
    rfc: '',
    numeroEmpleado: '',
    empresa: ''
  };

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  crearEmpleado(): void {
    this.empleadoService.createEmpleado(this.empleado).subscribe(() => {
      this.router.navigate(['/empleados']);
    });
  }
}
