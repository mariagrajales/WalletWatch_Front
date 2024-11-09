import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    FormsModule
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

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos a tu backend
    console.log('Datos de usuario:', this.user);
  }
}
