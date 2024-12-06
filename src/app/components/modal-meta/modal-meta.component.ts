import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgForOf } from '@angular/common';
import { MetaService } from '../../services/meta.service';
import { jwtDecode } from 'jwt-decode';
import {NzMessageService} from "ng-zorro-antd/message";

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
  @Output() metaCreada = new EventEmitter<void>();  // Emisor para la actualización de metas
  constructor(
    private message: NzMessageService,
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

      if (token.split('.').length !== 3) {
        alert('El token es inválido. Por favor, inicia sesión nuevamente.');
        return;
      }

      // Decodificar el token para obtener el usuario_id
      let usuario_id: string;
      try {
        const decodedToken: any = jwtDecode(token);
        usuario_id = decodedToken.user_id;  // Obtener el usuario_id del token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        this.message.create('error','Hubo un error al procesar el token. Por favor inicia sesion nuevamente.');
        return;
      }

      // Validar y formatear fechas y montos
      const fechaInicioISO = new Date(this.form.value.fecha_inicio).toISOString();
      const fechaFinalizacionISO = new Date(this.form.value.fecha_finalizacion).toISOString();
      const montoObjetivo = parseFloat(this.form.value.objetivo);
      const montoInicial = parseFloat(this.form.value.inicial);

      // Verificar que los montos sean números válidos
      if (isNaN(montoObjetivo) || isNaN(montoInicial)) {
        this.message.create('warning','Los montos deben ser números válidos');
        return;
      }

      // Verificar que las fechas estén correctas
      if (isNaN(Date.parse(fechaInicioISO)) || isNaN(Date.parse(fechaFinalizacionISO))) {
        alert('Las fechas deben ser válidas.');
        this.message.create('warning','Las fechas deben ser validas');
        return;
      }

      const meta = {
        usuario_id: null,
        nombre: this.form.value.nombre,
        monto_objetivo: montoObjetivo,
        monto_actual: montoInicial,
        fecha_inicio: fechaInicioISO,
        fecha_objetivo: fechaFinalizacionISO,
      };

      console.log('Datos a enviar:', meta);

      this.metaService.createMeta(meta, token).subscribe({
        next: (response) => {
          console.log('Meta creada exitosamente:', response);
          this.message.create('success','Meta creada exitosamente');
          this.metaCreada.emit();  // Emitir el evento para indicar que la meta fue creada
          this.closeDialog();
        },
        error: (error) => {
          console.error('Error al crear la meta:', error);
          if (error.error && error.error.detail) {
            console.log('Detalles del error:', error.error.detail);  // Imprimir detalles del error
          }
          this.message.create('error','Hubo un error al crear la meta. Intenta nuevamente.');
        },
      });
    } else {
      this.message.create('warning','Por favor completa todos los campos.');
    }
  }
}
