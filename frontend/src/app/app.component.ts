import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GanttDiagramComponent } from './gantt-diagram/gantt-diagram/gantt-diagram.component';
import { GanttFormComponent } from './gantt-diagram/gantt-form/gantt-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GanttDiagramComponent, GanttFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fases: any[] = [];
}
// El componente principal de la aplicación Angular. Aquí se define la estructura básica de la aplicación y se carga el enrutador.
