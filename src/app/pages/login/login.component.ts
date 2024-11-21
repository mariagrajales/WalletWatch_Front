import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialButtonComponent } from "../../shared/special-button/special-button.component";
import { AuthService } from "../../services/auth.service"; // Importar AuthService

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
      console.log('Formulario válido, enviando datos al backend...');
      const credentials = {
        correo: this.loginForm.value.email,
        contrasena: this.loginForm.value.password,
      };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('token', response.token); // Guardar el token en localStorage
          this.router.navigate(['/dashboard']); // Redirigir al dashboard
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Credenciales incorrectas o error en el servidor. Por favor, verifica tus datos.');
        },
      });
    } else {
      console.log('Formulario inválido');
      alert('Por favor completa todos los campos correctamente.');
    }
  }
}
