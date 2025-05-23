import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gantt-diagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gantt-diagram.component.html',
  styleUrls: ['./gantt-diagram.component.css']
})
export class GanttDiagramComponent implements OnChanges {
  @Input() fases: any[] = [];
  tasks: any[] = [];
  minDate: Date = new Date();
  dayMs = 1000 * 60 * 60 * 24;
  diasDelMes: number[] = Array.from({length: 32}, (_, i) => i + 1);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fases'] && this.fases && this.fases.length > 0) {
      this.generarTasks();
    }
  }

  generarTasks() {
    // Simula fechas consecutivas para cada fase
    let fechaActual = new Date();
    this.tasks = this.fases.map((fase, idx) => {
      const start = new Date(fechaActual);
      const end = new Date(start.getTime() + (fase.limiteHoras || 1) * this.dayMs);
      fechaActual = new Date(end.getTime() + this.dayMs);
      return {
        id: idx + 1,
        name: fase.nombre,
        start,
        end,
        asignaciones: fase.asignaciones
      };
    });
    this.minDate = this.tasks[0]?.start || new Date();
  }

  estaEnRango(task: any, dia: number): boolean {
    // Calcula el día de inicio y fin relativo al mes
    const startDay = task.start.getDate();
    const endDay = task.end.getDate();
    return dia >= startDay && dia <= endDay;
  }
}
