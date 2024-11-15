import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SpecialButtonComponent } from "../../shared/special-button/special-button.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule,
    SpecialButtonComponent,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
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
    confirmPassword: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos a tu backend
    console.log('Datos de usuario:', this.user);

    // Redirigir a la página de inicio de sesión después de registrarse
    this.router.navigate(['/login']);
  }

  onRegister() {
    // Ejecuta la lógica de registro y redirección a /login
    this.onSubmit();
  }
}
