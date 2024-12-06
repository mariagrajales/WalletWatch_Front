import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { GraficaProgresoComponent } from '../../shared/grafica-progreso/grafica-progreso.component';
import { ModalAbonoComponent } from '../modal-abono/modal-abono.component';
import { EditMetaComponent } from '../edit-meta/edit-meta.component';
import { MetaService } from '../../services/meta.service';
import {NzMessageService} from "ng-zorro-antd/message";  // Importamos el servicio

@Component({
  selector: 'app-card-progreso',
  templateUrl: './card-progreso.component.html',
  styleUrls: ['./card-progreso.component.css'],
  imports: [
    GraficaProgresoComponent,
    NzPopconfirmDirective,
    NzIconDirective
  ],
  standalone: true
})
export class CardProgresoComponent {
  @Input() ahorroMeta!: string;
  @Input() monto_objetivo!: number;
  @Input() monto_actual!: number;
  @Input() fecha_inicio!: string;
  @Input() fecha_objetivo!: string;
  @Input() id!: string;
  @Output() metaUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog, private metaService: MetaService, private message: NzMessageService) {}

  openModalAbono(): void {
    const dialogRef = this.dialog.open(ModalAbonoComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
      data: {
        id: this.id,
      }
    });

    // Verificamos si la modal está cerrada para refrescar los datos
    dialogRef.afterOpened().subscribe(() => {
      dialogRef.componentInstance.ngOnInit(); // Llamamos a ngOnInit para cargar los datos de los abonos
    });

    dialogRef.componentInstance.metaUpdated.subscribe(() => {
      this.metaUpdated.emit();
    });
  }

  convertToDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  }

  openEditMetaModal(): void {
    const fechaInicio = this.convertToDate(this.fecha_inicio);
    const fechaObjetivo = this.convertToDate(this.fecha_objetivo);

    if (!fechaInicio || !fechaObjetivo) {
      console.error('Fecha inválida', this.fecha_inicio, this.fecha_objetivo);
      return;
    }

    const dialogRef = this.dialog.open(EditMetaComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
      data: {
        id: this.id,
        nombre: this.ahorroMeta,
        monto_objetivo: this.monto_objetivo,
        monto_actual: this.monto_actual,
        fecha_inicio: fechaInicio,
        fecha_objetivo: fechaObjetivo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ahorroMeta = result.nombre;
        this.monto_objetivo = result.monto_objetivo;
        this.monto_actual = result.monto_actual;
        this.fecha_inicio = result.fecha_inicio;
        this.fecha_objetivo = result.fecha_objetivo;
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.metaUpdated.emit();
      }
    });
  }

  onDeleteConfirm(): void {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.message.create('error','No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }
    this.metaService.eliminarMeta(this.id, token).subscribe({
      next: (response: any) => {
        console.log('Meta eliminada exitosamente');
        this.message.create('success','La meta ha sido elimidada con éxito');
        this.metaUpdated.emit();
      },
      error: (err: any) => {
        console.error('Error al eliminar la meta:', err);
        this.message.create('error','Hubo un error al eliminar la meta, intenta nuevamente.');

      }
    });
  }
}
