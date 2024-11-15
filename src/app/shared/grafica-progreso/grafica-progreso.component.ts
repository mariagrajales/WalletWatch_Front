import { Component } from '@angular/core';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-grafica-progreso',
  standalone: true,
  imports: [NzProgressModule],
  templateUrl: './grafica-progreso.component.html',
  styleUrls: ['./grafica-progreso.component.css']
})
export class GraficaProgresoComponent {
  progreso = 75;
}
