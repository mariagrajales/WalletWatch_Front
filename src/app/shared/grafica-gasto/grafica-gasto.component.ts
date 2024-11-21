import { Component, Input } from '@angular/core';
import {NzProgressComponent} from "ng-zorro-antd/progress";
import {NgClass, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-grafica-gasto',
  templateUrl: './grafica-gasto.component.html',
  styleUrls: ['./grafica-gasto.component.css'],
  standalone: true,
  imports: [
    NzProgressComponent,
    NgIf,
    NzIconDirective,
    NgClass
  ]
})
export class GraficaGastoComponent {
  @Input() gastoTotal: number = 0; // Gasto total
  @Input() gastoActual: number = 0; // Gasto actual

  get porcentaje(): number {
    if (this.gastoTotal === 0) {
      return 0;
    }
    return parseFloat(((this.gastoActual / this.gastoTotal) * 100).toFixed(1));
  }

  get strokeColor(): string {
    if (this.porcentaje >= 100) {
      return 'red';
    } else if (this.porcentaje >= 75) {
      return 'orange';
    } else {
      return '#7767df';
    }
  }

  get icono(): string {
    if (this.porcentaje >= 100) {
      return 'close';
    } else if (this.porcentaje >= 75) {
      return 'warning';
    }
    return '';
  }

  // Función para ocultar el texto predeterminado
  formatoPorcentaje(): string {
    return '';
  }
}
