import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { GraficaProgresoComponent } from '../../shared/grafica-progreso/grafica-progreso.component';
import { ModalAbonoComponent } from '../modal-abono/modal-abono.component';
import { EditMetaComponent } from '../edit-meta/edit-meta.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card-progreso',
  standalone: true,
  imports: [
    GraficaProgresoComponent,
    NzIconDirective,
    NzPopconfirmModule,
    MatDialogModule,
    NgIf,
  ],
  templateUrl: './card-progreso.component.html',
  styleUrls: ['./card-progreso.component.css'],
})
export class CardProgresoComponent {
  @Input() ahorroMeta!: string; // Nombre del ahorro
  @Input() monto_objetivo!: number; // Monto objetivo
  @Input() monto_actual!: number; // Monto actual
  @Input() fecha_inicio!: string; // Fecha de inicio
  @Input() fecha_objetivo!: string; // Fecha objetivo

  constructor(private dialog: MatDialog) {}

  openModalAbono(): void {
    this.dialog.open(ModalAbonoComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
    });
  }

  openEditMetaModal(): void {
    const dialogRef = this.dialog.open(EditMetaComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
      data: {
        nombre: this.ahorroMeta,
        monto_objetivo: this.monto_objetivo,
        monto_actual: this.monto_actual,
        fecha_inicio: this.fecha_inicio,
        fecha_finalizacion: this.fecha_objetivo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualizar datos después de cerrar la modal
        this.ahorroMeta = result.nombre;
        this.monto_objetivo = result.monto_objetivo;
        this.monto_actual = result.monto_actual;
        this.fecha_inicio = result.fecha_inicio;
        this.fecha_objetivo = result.fecha_finalizacion;
      }
    });
  }

  onDeleteConfirm(): void {
    console.log('Meta eliminada');
    // Aquí puedes realizar acciones como llamar a un servicio para eliminar la meta
  }
}
