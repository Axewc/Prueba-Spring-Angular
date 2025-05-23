import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from '../../empleado.service';

@Component({
  selector: 'app-gantt-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gantt-form.component.html',
  styleUrls: ['./gantt-form.component.css']
})
export class GanttFormComponent implements OnInit {
  @Output() fasesGeneradas = new EventEmitter<any[]>();

  empleados: any[] = [];
  numFases: number = 1;
  fases: any[] = [];
  horasPorFase: number[] = [];
  limiteHoras: number[] = [];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit() {
    this.empleadoService.getEmpleados().subscribe(data => {
      this.empleados = data;
    });
    this.actualizarFases();
  }

  actualizarFases() {
    this.fases = Array.from({ length: this.numFases }, (_, i) => ({
      nombre: `Fase ${i + 1}`,
      asignaciones: [],
      horasTotales: 0
    }));
    this.limiteHoras = Array(this.numFases).fill(0);
    this.horasPorFase = Array(this.numFases).fill(0);
  }

  agregarAsignacion(faseIdx: number) {
    this.fases[faseIdx].asignaciones.push({ empleadoId: null, horas: 0 });
  }

  eliminarAsignacion(faseIdx: number, asigIdx: number) {
    this.fases[faseIdx].asignaciones.splice(asigIdx, 1);
    this.calcularHorasTotales(faseIdx);
  }

  calcularHorasTotales(faseIdx: number) {
    const total = this.fases[faseIdx].asignaciones.reduce((sum: number, a: any) => sum + Number(a.horas), 0);
    this.fases[faseIdx].horasTotales = total;
  }

  onSubmit() {
    // Validar límites
    for (let i = 0; i < this.fases.length; i++) {
      if (this.fases[i].horasTotales > this.limiteHoras[i]) {
        alert(`No puedes asignar más de ${this.limiteHoras[i]} horas en la Fase ${i + 1}`);
        return;
      }
    }
    this.fasesGeneradas.emit(this.fases.map((f: any, i: number) => ({
      ...f,
      limiteHoras: this.limiteHoras[i]
    })));
  }
}
