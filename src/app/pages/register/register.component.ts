import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from "@angular/forms";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NgForOf, NgIf } from "@angular/common";
import { SpecialButtonComponent } from "../../shared/special-button/special-button.component";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NzIconDirective,
    NgIf,
    RouterLink,
    NgForOf,
    SpecialButtonComponent
  ],
})
export class RegisterComponent {
  user = {
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    username: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    estado: null,
    direccion: '',
    salario: null,
    balanceObjetivo: null,
    limiteGastos: null,
    divisa: 'MXN',
  };

  currentStep = 1;
  // Lista de estados manualmente agregada
  estados: any[] = [
    { id: 2, nombre: 'Aguascalientes', pais: 'México' },
    { id: 3, nombre: 'Baja California', pais: 'México' },
    { id: 4, nombre: 'Baja California Sur', pais: 'México' },
    { id: 5, nombre: 'Campeche', pais: 'México' },
    { id: 1, nombre: 'Chiapas', pais: 'México' },
    { id: 31, nombre: 'Ciudad de México', pais: 'México' },
    { id: 6, nombre: 'Coahuila', pais: 'México' },
    { id: 7, nombre: 'Colima', pais: 'México' },
    { id: 8, nombre: 'Durango', pais: 'México' },
    { id: 13, nombre: 'Estado de México', pais: 'México' },
    { id: 9, nombre: 'Guanajuato', pais: 'México' },
    { id: 10, nombre: 'Guerrero', pais: 'México' },
    { id: 11, nombre: 'Hidalgo', pais: 'México' },
    { id: 12, nombre: 'Jalisco', pais: 'México' },
    { id: 14, nombre: 'Michoacán', pais: 'México' },
    { id: 15, nombre: 'Morelos', pais: 'México' },
    { id: 16, nombre: 'Nayarit', pais: 'México' },
    { id: 17, nombre: 'Nuevo León', pais: 'México' },
    { id: 18, nombre: 'Oaxaca', pais: 'México' },
    { id: 19, nombre: 'Puebla', pais: 'México' },
    { id: 20, nombre: 'Querétaro', pais: 'México' },
    { id: 21, nombre: 'Quintana Roo', pais: 'México' },
    { id: 22, nombre: 'San Luis Potosí', pais: 'México' },
    { id: 23, nombre: 'Sinaloa', pais: 'México' },
    { id: 24, nombre: 'Sonora', pais: 'México' },
    { id: 25, nombre: 'Tabasco', pais: 'México' },
    { id: 26, nombre: 'Tamaulipas', pais: 'México' },
    { id: 27, nombre: 'Tlaxcala', pais: 'México' },
    { id: 28, nombre: 'Veracruz', pais: 'México' },
    { id: 29, nombre: 'Yucatán', pais: 'México' },
    { id: 30, nombre: 'Zacatecas', pais: 'México' }
  ];

  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router, private message: NzMessageService) {}

  ngOnInit(): void {
    console.log("ngOnInit ejecutado");

    // Comprobar si el token está en el localStorage
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.message.create('error', 'No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }
  }

  nextStep(): void {
    this.currentStep++;
  }

  prevStep(): void {
    this.currentStep--;
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.message.create('warning','Las contraseñas no coinciden');
      return;
    }

    this.isSubmitting = true;

    const registerData = {
      correo: this.user.email,
      contrasena: this.user.password,
      fecha_registro: new Date().toISOString().split('T')[0],
      nombre: this.user.nombre,
      apellido_paterno: this.user.apellidoP,
      apellido_materno: this.user.apellidoM,
      pais_id: 1,
      estado_id: this.user.estado,
      direccion: this.user.direccion,
      salario: this.user.salario,
      divisa: this.user.divisa,
      balance_objetivo: this.user.balanceObjetivo,
      gasto_limite: this.user.limiteGastos,
    };

    console.log('Datos enviados al backend:', registerData);

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.message.create('success','Registro exitoso');
        console.log(response);
        this.isSubmitting = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.message.create('error','Error al registrar. Intenta nuevamente.');
        this.isSubmitting = false;
      },
    });
  }
}
