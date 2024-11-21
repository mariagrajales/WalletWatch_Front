import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-meta',
  standalone: true,
  templateUrl: './edit-meta.component.html',
  styleUrls: ['./edit-meta.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class EditMetaComponent implements OnInit {
  form: FormGroup; // Formulario reactivo
  isEditable: boolean = false; // Estado de edición

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditMetaComponent>,
    @Inject(MAT_DIALOG_DATA) public meta: any // Inyectamos los datos enviados desde MatDialog
  ) {
    this.form = this.fb.group({
      nombre: [''],
      monto_objetivo: [''],
      monto_actual: [''],
      fecha_inicio: [''],
      fecha_finalizacion: [''],
    });
  }

  ngOnInit(): void {
    // Precargar datos de la meta en el formulario
    if (this.meta) {
      this.form.patchValue(this.meta); // Actualiza los valores del formulario con los datos enviados
    }
  }

  toggleEditable(): void {
    this.isEditable = !this.isEditable;

    // Activar/desactivar los campos del formulario
    if (this.isEditable) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  saveChanges(): void {
    if (this.form.valid) {
      console.log('Datos guardados:', this.form.value);
      // Aquí puedes agregar lógica para enviar los datos al backend o actualizar el estado
      this.dialogRef.close(this.form.value); // Cierra la modal y envía los datos
    }
  }

  closeDialog(): void {
    this.dialogRef.close(); // Cierra la modal
  }
}
