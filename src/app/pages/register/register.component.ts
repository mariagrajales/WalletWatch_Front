import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from "@angular/forms";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NgForOf, NgIf} from "@angular/common";
import {SpecialButtonComponent} from "../../shared/special-button/special-button.component"; // Cambiar el path si es necesario

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
    salarioMXN: null,
    salarioUSD: null,
    balanceObjetivo: null,
    limiteGastos: null,
  };

  currentStep = 1; // Control para los pasos
  estados = [
    { id: 1, nombre: 'Aguascalientes' },
    { id: 2, nombre: 'Baja California' },
    // Más estados aquí...
  ];

  constructor(private authService: AuthService, private router: Router) {}

  // Ir al siguiente paso
  nextStep(): void {
    this.currentStep++;
  }

  // Regresar al paso anterior
  prevStep(): void {
    this.currentStep--;
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Mapeo de los datos al formato esperado por el backend
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
      salario_mxn: this.user.salarioMXN,
      salario_usd: this.user.salarioUSD,
      balance_objetivo: this.user.balanceObjetivo,
      gasto_limite: this.user.limiteGastos,
    };

    // Llamar al servicio para registrar
    this.authService.register(registerData).subscribe({
      next: (response) => {
        alert('Registro exitoso');
        console.log(response);
        this.router.navigate(['/login']); // Redirigir al login
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert('Error al registrar. Intenta nuevamente.');
      },
    });
  }
}
