import {Component, OnInit} from '@angular/core';
import {GraficaProgresoComponent} from "../../shared/grafica-progreso/grafica-progreso.component";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-card-progreso',
  standalone: true,
  imports: [GraficaProgresoComponent, NzIconDirective],
  templateUrl: './card-progreso.component.html',
  styleUrls: ['./card-progreso.component.css']
})
export class CardProgresoComponent implements OnInit {
  ahorroMeta: string = 'vacaciones'; // Valor predeterminado o inicial

  constructor() {}

  ngOnInit(): void {
    // En el futuro, podrías obtener este valor desde el backend
  }
}
