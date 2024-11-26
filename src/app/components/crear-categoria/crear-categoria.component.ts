import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GastoService } from '../../services/gasto.service';
import {NzMessageService} from "ng-zorro-antd/message";  // Servicio para manejar las categorías

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css'],
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class CrearCategoriaComponent {
  @Output() categoriaRegistrada = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private message: NzMessageService,
    public dialogRef: MatDialogRef<CrearCategoriaComponent>,
    private fb: FormBuilder,
    private gastoService: GastoService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      limite_gasto: ['', [Validators.required, Validators.min(1)]],
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  crearCategoria(): void {
    const nombre = this.form.value.nombre;
    const limite_gasto = this.form.value.limite_gasto;

    if (nombre && limite_gasto) {
      const token = localStorage.getItem('token') || '';

      if (!token) {
        this.message.create('error','No se encontro un token válido. Por favor, inicie sesión.');
        return;
      }

      const categoria = {
        usuario_id: null,
        nombre: nombre,
        limite_gasto: limite_gasto,
        gasto_total: null
      };

      this.gastoService.crearCategoria(categoria, token).subscribe({
        next: (response) => {
          console.log('Categoría creada con éxito', response);
          this.message.create('success','Categoria creada con exito');
          this.categoriaRegistrada.emit();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error al crear la categoría:', err);
          this.message.create('error','Hubo un error al crear la categoria. Intenta nuevamente.');
        }
      });
    } else {
      this.message.create('warning','Por favor, ingrese los datos correctamente.');
    }
  }
}
