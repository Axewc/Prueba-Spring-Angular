import { Routes } from '@angular/router';
import { ListarEmpleadosComponent } from './listar-empleados/listar-empleados.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { DetalleEmpleadoComponent } from './detalle-empleado/detalle-empleado.component'; // Importar el nuevo componente
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }, // Redirigir a empleados por defecto
  { path: 'empleados', component: ListarEmpleadosComponent },
  { path: 'empleados/nuevo', component: CrearEmpleadoComponent },
  { path: 'empleados/editar/:id', component: CrearEmpleadoComponent }, // Agregar ruta para editar empleados
  { path: 'empleados/detalle', component: DetalleEmpleadoComponent } // Nueva ruta para la vista detallada
];

export const imports = [
  HttpClientModule,
];
