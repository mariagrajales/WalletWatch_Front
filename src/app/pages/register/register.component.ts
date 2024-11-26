import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GeoService } from '../../services/geo.service';
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
  estados: any[] = [];  // Aquí se guardarán los estados obtenidos
  isSubmitting = false;

  constructor(private authService: AuthService, private router: Router, private message: NzMessageService,    private geoService: GeoService,  // Inyectamos el servicio
    ) {}

  ngOnInit(): void {
    console.log("ngOnInit ejecutado");  // Asegúrate de que este log se muestre en la consola
    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.message.create('error', 'No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }

    // Llamar al servicio para obtener los estados
    this.geoService.getEstados(token).subscribe({
      next: (response) => {
        this.estados = response;  // Asignamos la respuesta a la variable de estados
        console.log('Estados cargados:', this.estados);
      },
      error: (err) => {
        console.error('Error al obtener los estados:', err);
        this.message.create('error', 'Hubo un error al cargar los estados.');
      }
    });
  }



  nextStep(): void {
    this.currentStep++;
  }

  // Regresar al paso anterior
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
