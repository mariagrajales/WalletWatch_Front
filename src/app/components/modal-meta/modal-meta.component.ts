import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-modal-meta',
  standalone: true,
  templateUrl: './modal-meta.component.html',
  styleUrls: ['./modal-meta.component.css'],
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, NgForOf, FormsModule],
})
export class ModalMetaComponent {
  form: FormGroup;

  periodicidades = [
    { value: 'diario', viewValue: 'Diario' },
    { value: 'semanal', viewValue: 'Semanal' },
    { value: 'quincenal', viewValue: 'Quincenal' },
    { value: 'mensual', viewValue: 'Mensual' },
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalMetaComponent>,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: [''],
      objetivo: [''],
      inicial: [''],
      periodicidad: [''],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.form.value);
    this.closeDialog();
  }
}
