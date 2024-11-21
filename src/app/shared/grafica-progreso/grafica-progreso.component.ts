import { Component, Input, OnInit } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-grafica-progreso',
  standalone: true,
  imports: [NzProgressModule],
  templateUrl: './grafica-progreso.component.html',
  styleUrls: ['./grafica-progreso.component.css']
})
export class GraficaProgresoComponent implements OnInit {
  @Input() monto_objetivo: number = 0; // Monto objetivo que se recibe como input
  @Input() monto_actual: number = 0; // Monto actual que se recibe como input
  progreso: number = 0; // Porcentaje de progreso calculado dinámicamente

  ngOnInit(): void {
    this.calcularProgreso();
  }

  calcularProgreso(): void {
    if (this.monto_objetivo > 0) {
      this.progreso = (this.monto_actual / this.monto_objetivo) * 100;
      this.progreso = Math.min(this.progreso, 100); // Limita el progreso máximo al 100%
    }
  }
}
