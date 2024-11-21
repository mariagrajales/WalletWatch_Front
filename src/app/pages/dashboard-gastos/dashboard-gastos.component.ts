import { Component } from '@angular/core';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {GraficaGastoComponent} from "../../shared/grafica-gasto/grafica-gasto.component";

@Component({
  selector: 'app-dashboard-gastos',
  templateUrl: './dashboard-gastos.component.html',
  styleUrls: ['./dashboard-gastos.component.css'],
  standalone: true,
  imports: [NzTagModule, NgIf, GraficaGastoComponent, NgForOf, NgClass], // Importamos el módulo NzTagModule
})
export class DashboardGastosComponent {
  categorias = [
    {
      nombre: 'Alimentos',
      expandido: false,
      gastoTotal: 1500,
      gastoActual: 1450,
      periodo: 'Enero - Febrero', // Periodo recibido del backend
    },
    {
      nombre: 'Entretenimiento',
      expandido: false,
      gastoTotal: 1000,
      gastoActual: 300,
      periodo: 'Enero - Febrero', // Periodo recibido del backend
    },
    {
      nombre: 'Transporte',
      expandido: false,
      gastoTotal: 600,
      gastoActual: 600,
      periodo: 'Enero - Febrero', // Periodo recibido del backend
    },
  ];


  toggleCategoria(categoria: any): void {
    categoria.expandido = !categoria.expandido;
  }

  getTagColor(gastoActual: number, gastoTotal: number): string {
    const progreso = (gastoActual / gastoTotal) * 100;

    if (progreso < 75) {
      return 'green'; // Verde si es menos del 75%
    } else if (progreso < 100) {
      return 'orange'; // Naranja si está entre 75% y 99%
    } else {
      return 'red'; // Rojo si es 100% o más
    }
  }

  getTagMessage(gastoActual: number, gastoTotal: number): string {
    const progreso = (gastoActual / gastoTotal) * 100;

    if (progreso < 75) {
      return 'Buen progreso, aún tienes margen para gastar.';
    } else if (progreso < 100) {
      return 'Advertencia: estás cerca de alcanzar el límite.';
    } else {
      return `¡Has excedido el límite de tu gasto para el periodo!`;
    }
  }
}
