import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { GastoService } from '../../services/gasto.service'; // Importamos el servicio
import { AuthService } from '../../services/auth.service';
import {NzMessageService} from "ng-zorro-antd/message"; // Para obtener el token

@Component({
  selector: 'app-registrar-gasto',  // Cambié el nombre del selector para que coincida con tu requerimiento
  templateUrl: './registrar-gasto.component.html',
  styleUrls: ['./registrar-gasto.component.css'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class RegistrarGastoComponent {
  @Output() gastoRegistrado = new EventEmitter<void>();  // Nuevo evento para notificar que el gasto fue registrado
  form: FormGroup;
  categoriaId: string = '';  // Variable para almacenar el id de la categoría

  constructor(
    private message: NzMessageService,
    public dialogRef: MatDialogRef<RegistrarGastoComponent>,  // Cambié el tipo aquí también
    private fb: FormBuilder,
    private gastoService: GastoService, // Inyectamos el servicio
    private authService: AuthService, // Inyectamos el servicio de autenticación
    @Inject(MAT_DIALOG_DATA) public data: any // Recibimos los datos del modal
  ) {
    this.form = this.fb.group({
      monto: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
    this.categoriaId = data.id; // Asignamos el `categoriaId` recibido al campo categoriaId
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Función para registrar el gasto
  registrarGasto(): void {
    const monto = this.form.value.monto;
    const descripcion = this.form.value.descripcion;
    const fecha = new Date().toISOString();  // Fecha actual

    // Validar que los datos sean correctos
    if (monto <= 0 || !descripcion) {
      alert('Por favor, ingrese los datos correctamente.');
      return;
    }

    const token = localStorage.getItem('token') || '';  // Obtenemos el token de localStorage

    if (!token) {
      alert('No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }

    // Creamos el objeto con los datos a enviar
    const gasto = {
      usuario_id: null,  // El usuario siempre es null según el backend
      monto: monto,
      fecha: fecha,
      descripcion: descripcion,
      categoria_id: this.categoriaId,  // El id de la categoría
    };

    // Imprime los datos que se están enviando al backend
    console.log('Datos a enviar al backend:', gasto);

    // Llamamos al servicio para registrar el gasto
    this.gastoService.registrarGasto(gasto, token).subscribe({
      next: (response) => {
        console.log('Gasto registrado con éxito', response);
        this.message.create('success', 'Gasto registrado con éxito');
        this.gastoRegistrado.emit();  // Emitimos el evento para que el componente padre actualice la lista
        this.dialogRef.close();  // Cerramos el modal después de registrar
      },
      error: (err) => {
        console.error('Error al registrar el gasto:', err);
        this.message.create('error','Hubo un error al registrar el gasto. Intenta nuevamente.');
      },
    });
  }

}
