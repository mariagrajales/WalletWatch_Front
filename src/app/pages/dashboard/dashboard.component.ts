import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalMetaComponent } from '../../components/modal-meta/modal-meta.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardProgresoComponent } from '../../components/card-progreso/card-progreso.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    NzIconModule,
    MatButtonModule,
    CardProgresoComponent,
    NgForOf,
  ],
})
export class DashboardComponent implements OnInit {
  metas: any[] = []; // Array para almacenar las metas
  openDropdownId: number | null = null; // Controla cuál dropdown está abierto

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarMetas(); // Simula la carga de datos desde un backend
  }

  cargarMetas(): void {
    // Simula la respuesta del backend
    this.metas = [
      {
        id: 1,
        nombre: 'Vacaciones',
        monto_objetivo: 10000,
        monto_actual: 4500,
        fecha_inicio: '2024-01-01',
        fecha_objetivo: '2024-12-31',
      },
      {
        id: 2,
        nombre: 'Curso de inglés',
        monto_objetivo: 5000,
        monto_actual: 2000,
        fecha_inicio: '2024-02-01',
        fecha_objetivo: '2024-06-30',
      },
      {
        id: 3,
        nombre: 'Compra de computadora',
        monto_objetivo: 20000,
        monto_actual: 15000,
        fecha_inicio: '2024-03-01',
        fecha_objetivo: '2024-11-30',
      },
    ];
  }

  toggleDropdown(id: number): void {
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  openModal(): void {
    this.dialog.open(ModalMetaComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
    });
  }
}
