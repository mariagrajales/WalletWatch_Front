import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf } from '@angular/common';

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
  ],
})
export class ModalAbonoComponent {
  form: FormGroup;

  abonosRecientes = [
    { fecha: '17 de noviembre de 2024', monto: 500 },
    { fecha: '15 de noviembre de 2024', monto: 400 },
    { fecha: '15 de noviembre de 2024', monto: 300 },
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalAbonoComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      monto: [''],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  realizarAbono(): void {
    const nuevoAbono = this.form.value.monto;
    console.log(`Abono realizado: $${nuevoAbono}`);
    this.closeDialog();
  }
}
