import { Component } from '@angular/core';
import { NgxGanttModule } from 'ngx-gantt';

@Component({
  selector: 'app-gantt',
  standalone: true,
  imports: [NgxGanttModule],
  template: `
    <ngx-gantt [items]="items"></ngx-gantt>
  `,
  styles: [`
    :host { display: block; margin: 2rem 0; }
    ngx-gantt { width: 100%; min-height: 400px; }
  `]
})
export class GanttComponent {
  items = [
    { id: '1', title: 'Planificación', start: new Date('2025-05-01'), end: new Date('2025-05-05') },
    { id: '2', title: 'Desarrollo', start: new Date('2025-05-06'), end: new Date('2025-05-15') },
    { id: '3', title: 'Pruebas', start: new Date('2025-05-16'), end: new Date('2025-05-20') }
  ];
}
