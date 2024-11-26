import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-grafica-resumen',
  templateUrl: './grafica-resumen.component.html',
  standalone: true,
  imports: [
    NgStyle
  ],
  styleUrls: ['./grafica-resumen.component.css']
})
export class GraficaResumenComponent implements OnChanges {
  @Input() gasto_total: number = 0;
  @Input() limite_total: number = 0;
  @Input() balance: number = 0;

  public porcentajeGasto: number = 0;

  // Método que se ejecuta cuando las propiedades de entrada cambian
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gasto_total'] || changes['limite_total']) {
      // Calculamos el porcentaje del gasto total respecto al límite total
      this.porcentajeGasto = (this.gasto_total / this.limite_total) * 100;

      // Si el porcentaje del gasto es mayor al 100%, lo ajustamos a 100%
      if (this.porcentajeGasto > 100) {
        this.porcentajeGasto = 100;
      }
    }
  }
}
