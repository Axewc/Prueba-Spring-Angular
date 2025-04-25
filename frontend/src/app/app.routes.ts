import { Routes } from '@angular/router';
import { ListarEmpleadosComponent } from './listar-empleados/listar-empleados.component';
import { CrearEmpleadoComponent } from './crear-empleado/crear-empleado.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' }, // Redirigir a empleados por defecto
  { path: 'empleados', component: ListarEmpleadosComponent },
  { path: 'empleados/nuevo', component: CrearEmpleadoComponent },
  { path: 'empleados/editar/:id', component: CrearEmpleadoComponent }, // Agregar ruta para editar empleados
];

export const imports = [
  HttpClientModule,
];
