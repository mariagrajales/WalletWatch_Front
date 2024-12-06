import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialButtonComponent } from "../../shared/special-button/special-button.component";
import { AuthService } from "../../services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message"; // Importar AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SpecialButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // Inyectar el servicio de autenticación
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = {
        correo: this.loginForm.value.email,
        contrasena: this.loginForm.value.password
      };

      console.log('Datos enviados al backend:', loginData);

      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);

          if (response.access_token) {
            localStorage.removeItem('token');
            localStorage.setItem('token', response.access_token);
            console.log('Token guardado en local storage');
            this.router.navigate(['/dashboard']);
          } else {
            this.message.create('error','Hubo un problema al iniciar sesión. Intenta nuevamente.');
            console.error('No se encontró el token en la respuesta del servidor');
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión:', error);
          this.message.create('warning','Credenciales inválidas. Por favor, intenta nuevamente.');

        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
