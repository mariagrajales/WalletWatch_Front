import { Component, OnInit } from '@angular/core';
import { ResumenService } from '../../services/resumen.service';  // Asegúrate de importar el servicio
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { GraficaResumenComponent } from "../../shared/grafica-resumen/grafica-resumen.component";
import {NzAlertModule} from "ng-zorro-antd/alert";

@Component({
  selector: 'app-dashboard-resumen',
  templateUrl: './dashboard-resumen.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NzIconDirective,
    CurrencyPipe,
    GraficaResumenComponent,
    NzAlertModule,
    NgIf
  ],
  styleUrls: ['./dashboard-resumen.component.css'],
})
export class DashboardResumenComponent implements OnInit {
  // Datos de la gráfica
  gastoTotal: number = 0;
  limiteTotal: number = 0;
  balance: number = 0;
  selectedPeriod: number = 1;  // Valor inicial para Un mes
  selectedPeriodName: string = '';

  alertType: 'success' | 'warning' | 'error' = 'success';  // Valor por defecto
  alertMessage: string = '';

  periods = [
    { value: 0.25, name: 'Una semana' },
    { value: 0.5, name: 'Quince días' },
    { value: 1, name: 'Un mes' },
    { value: 3, name: 'Tres meses' },
    { value: 6, name: 'Seis meses' },
    { value: 12, name: 'Un año' }
  ];

  constructor(private resumenService: ResumenService) {}

  ngOnInit(): void {
    // Inicializar el nombre del periodo al cargar
    this.updatePeriodName();
    // Hacer la petición inicial
    this.fetchResumen();
  }

  // Método para actualizar el nombre del periodo seleccionado
  updatePeriodName(): void {
    console.log("Valor de selectedPeriod en updatePeriodName():", this.selectedPeriod);

    // Convertir el valor de selectedPeriod a número, si es necesario
    const selected = this.periods.find(option => option.value === +this.selectedPeriod);
    this.selectedPeriodName = selected ? selected.name : 'No definido';
    this.fetchResumen();  // Llamar la API cuando el periodo cambie
    console.log('Nombre del periodo actualizado:', this.selectedPeriodName);
  }

  // Método para obtener los datos del resumen
  fetchResumen(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.resumenService.getResumen(this.selectedPeriod, token).subscribe(
        (response) => {
          this.gastoTotal = response.gasto_total;
          this.limiteTotal = response.limite_total;
          this.balance = response.balance;
          console.log('Datos recibidos:', response);
          this.updateAlert();
        },
        (error) => {
          console.error('Error al obtener los datos', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  updateAlert(): void {
    const porcentajeGasto = (this.gastoTotal / this.limiteTotal) * 100;

    if (porcentajeGasto < 75) {
      this.alertType = 'success';
      this.alertMessage = `Bien hecho, ¡Tus gastos están bajo control!. Tienes un ${100 - porcentajeGasto}% de tu presupuesto disponible.`;
    } else if (porcentajeGasto >= 75 && porcentajeGasto < 100) {
      this.alertType = 'warning';
      this.alertMessage = `Estás cerca del límite, ¡trabaja en reducir tus gastos! Queda un ${100 - porcentajeGasto}% de tu presupuesto.`;
    } else {
      this.alertType = 'error';
      this.alertMessage = `¡Cuidado! Has alcanzado el límite de tu presupuesto. Es necesario ajustar tus gastos.`;
    }
  }
}
