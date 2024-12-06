import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MetaService } from '../../services/meta.service'; // Inyectamos el servicio para guardar
import { jwtDecode } from 'jwt-decode';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-edit-meta',
  standalone: true,
  templateUrl: './edit-meta.component.html',
  styleUrls: ['./edit-meta.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [DatePipe]  // Asegúrate de que DatePipe esté disponible
})
export class EditMetaComponent implements OnInit {
  form: FormGroup; // Formulario reactivo
  isEditable: boolean = false; // Estado de edición
  @Output() metaUpdated = new EventEmitter<void>(); // Evento para avisar que se actualizó una meta

  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditMetaComponent>,
    @Inject(MAT_DIALOG_DATA) public meta: any, // Inyectamos los datos enviados desde MatDialog
    private datePipe: DatePipe,
    private metaService: MetaService // Inyectamos el servicio de metas
  ) {
    this.form = this.fb.group({
      nombre: [''],
      monto_objetivo: [''],
      monto_actual: [''],
      fecha_inicio: [''],
      fecha_finalizacion: [''],
    });
  }

  isValidDate(date: string): boolean {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  ngOnInit(): void {
    if (this.meta) {
      const token = localStorage.getItem('token');
      if (token) {
        let usuario_id: string;
        try {
          const decodedToken: any = jwtDecode(token);
          usuario_id = decodedToken.user_id;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          this.message.create('error','Hubo un error al procesar el token. Por favor inicia sesion nuevamente.');
          return;
        }

        // Verifica si el ID de la meta está presente
        if (!this.meta.id) {
          console.error('El ID de la meta no está disponible');
          this.message.create('error','El ID de la meta no está disponible para editar');
          return;
        }

        // Convertir las fechas al formato 'yyyy-MM-dd' (para mostrar en input de fecha)
        const fechaInicio = this.meta.fecha_inicio ? this.convertToDate(this.meta.fecha_inicio) : '';
        const fechaFinalizacion = this.meta.fecha_objetivo ? this.convertToDate(this.meta.fecha_objetivo) : '';

        this.form.patchValue({
          usuario_id: usuario_id,
          nombre: this.meta.nombre,
          monto_objetivo: this.meta.monto_objetivo,
          monto_actual: this.meta.monto_actual,
          fecha_inicio: fechaInicio,
          fecha_finalizacion: fechaFinalizacion,
        });
        this.form.disable();

        this.form.get('monto_actual')?.disable();

        this.meta.usuario_id = usuario_id; // Asignamos el usuario_id decodificado
      } else {
        console.error('No se encontró un token válido');
        this.message.create('error','No se encontro un token válido');
        return;
      }
    }
  }


  // Función para convertir la fecha al formato 'yyyy-MM-dd' para el input tipo date
  convertToDate(date: string): string {
    const parsedDate = new Date(date);
    const day = ('0' + parsedDate.getDate()).slice(-2);
    const month = ('0' + (parsedDate.getMonth() + 1)).slice(-2);
    const year = parsedDate.getFullYear();
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato 'yyyy-MM-dd'
  }

  toggleEditable(): void {
    this.isEditable = !this.isEditable;

    if (this.isEditable) {
      this.form.enable();
      this.form.get('monto_actual')?.disable(); // Deshabilitar "Monto actual"
    } else {
      this.form.disable();
      this.form.get('monto_actual')?.disable(); // Asegurarnos de que "Monto actual" esté deshabilitado
    }
  }


  saveChanges(): void {
    if (this.form.valid) {
      console.log('Datos guardados:', this.form.value);

      if (!this.meta.id) {
        console.error('El ID de la meta no está disponible');
        this.message.create('error','El ID de la meta no esta disponible para actualizar.');
        return;
      }

      const fechaInicio = new Date(this.form.value.fecha_inicio).toISOString();
      const fechaFinalizacion = new Date(this.form.value.fecha_finalizacion).toISOString();

      const montoActual = this.form.get('monto_actual')?.value;

      const metaData = {
        //usuario_id: this.meta.usuario_id,
        nombre: this.form.value.nombre,
        monto_objetivo: this.form.value.monto_objetivo,
        //monto_actual: montoActual,
        fecha_inicio: fechaInicio,
        fecha_objetivo: fechaFinalizacion,
      };

      this.metaService.updateMeta(this.meta.id, metaData).subscribe({
        next: (response) => {
          this.message.create('success','Meta actualizada exitosamente.');
          this.metaUpdated.emit();
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error al actualizar la meta:', error);
          this.message.create('error','Hubo un error al actualizar la meta.');
        }
      });
    }
  }


  closeDialog(): void {
    this.dialogRef.close(); // Cierra la modal
  }
}
