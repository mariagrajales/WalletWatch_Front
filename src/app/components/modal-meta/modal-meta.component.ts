import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgForOf } from '@angular/common';
import { MetaService } from '../../services/meta.service';
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-modal-meta',
  standalone: true,
  templateUrl: './modal-meta.component.html',
  styleUrls: ['./modal-meta.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NzDatePickerModule,
    NgForOf,
    FormsModule,
  ],
})
export class ModalMetaComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalMetaComponent>,
    private fb: FormBuilder,
    private metaService: MetaService // Inyectar el servicio de metas
  ) {
    const fechaActual = new Date().toISOString().split('T')[0];

    this.form = this.fb.group({
      nombre: [''],
      objetivo: [''],
      inicial: [''],
      fecha_inicio: [fechaActual],
      fecha_finalizacion: [''],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No se encontró un token. Por favor, inicia sesión nuevamente.');
        return;
      }

      const decodedToken: any = jwtDecode(token);
      const usuario_id = decodedToken.user_id;

      const meta = {
        usuario_id: usuario_id,
        nombre: this.form.value.nombre,
        monto_objetivo: parseFloat(this.form.value.objetivo),
        monto_actual: parseFloat(this.form.value.inicial),
        fecha_inicio: this.form.value.fecha_inicio,
        fecha_objetivo: this.form.value.fecha_finalizacion,
      };

      this.metaService.createMeta(meta).subscribe({
        next: (response) => {
          console.log('Meta creada exitosamente:', response);
          alert('Meta creada exitosamente.');
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error al crear la meta:', error);
          alert('Hubo un error al crear la meta. Intenta nuevamente.');
        },
      });
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}
