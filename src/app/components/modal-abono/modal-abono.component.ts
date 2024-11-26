import { Component, EventEmitter, Inject, Output, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {DatePipe, NgForOf} from '@angular/common';
import { MetaService } from '../../services/meta.service';
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-modal-abono',
  standalone: true,
  templateUrl: './modal-abono.component.html',
  styleUrls: ['./modal-abono.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgForOf,
    DatePipe,
  ],
  providers: [DatePipe]  // Agregar DatePipe en los providers
})
export class ModalAbonoComponent implements OnInit {
  @Output() metaUpdated = new EventEmitter<void>();
  form: FormGroup;
  abonosRecientes: any[] = [];

  metaId: string = '';

  constructor(
    private message: NzMessageService,
    public dialogRef: MatDialogRef<ModalAbonoComponent>,
    private fb: FormBuilder,
    private metaService: MetaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe  // Inyectar DatePipe
  ) {
    this.form = this.fb.group({
      monto: [''],
    });
    this.metaId = data.id;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.message.create('error', 'No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }

    this.metaService.getUltimosAbonos(this.metaId, token).subscribe({
      next: (response) => {
        this.abonosRecientes = response;
      },
      error: (err) => {
        console.error('Error al obtener los abonos:', err);
        this.message.create('error', 'Hubo un error al cargar los abonos.');
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  realizarAbono(): void {
    const nuevoAbono = this.form.value.monto;
    if (nuevoAbono <= 0) {
      this.message.create('warning', 'El monto debe ser mayor que 0');
      return;
    }

    const token = localStorage.getItem('token') || '';

    if (!token) {
      this.message.create('error', 'No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }

    this.metaService.abonarMeta(this.metaId, nuevoAbono, token).subscribe({
      next: (response) => {
        console.log(`Abono realizado: $${nuevoAbono}`);
        this.message.create('success', 'Abono realizado exitosamente.');
        this.metaUpdated.emit();
        this.closeDialog();
      },
      error: (err) => {
        console.error('Error al realizar el abono:', err);
        this.message.create('error', 'Hubo un error al realizar el abono. Intenta nuevamente.');
      },
    });
  }
}
