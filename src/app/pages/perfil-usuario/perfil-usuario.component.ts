import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Importa el servicio
import { NzAvatarComponent } from 'ng-zorro-antd/avatar';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  imports: [NzAvatarComponent, FormsModule, NgIf, NgForOf],
  standalone: true,
})
export class PerfilUsuarioComponent implements OnInit {
  // Propiedades de usuario
  nombre: string = '';
  apellidoP: string = '';
  apellidoM: string = '';
  email: string = '';
  telefono: string = '';
  username: string = '';
  fechaRegistro: string = '';
  salarioMXN: number = 0;
  salarioUSD: number = 0;
  pais: string = '';
  estado: string = '';
  direccion: string = '';
  isEditable: boolean = false; // Estado para saber si estamos en modo de edición
  estadoId: number | null = null; // Para guardar el id del estado seleccionado

  balance_objetivo: number = 0; // Guardamos los valores de balance_objetivo
  gasto_limite: number = 0; // Guardamos los valores de gasto_limite
  originalData: any;

  // Relación de estados
  estados = [
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
    { id: 30, nombre: 'Zacatecas', pais: 'México' },
  ];

  get fullName(): string {
    return `${this.nombre} ${this.apellidoP} ${this.apellidoM}`;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserDetails(token).subscribe((data) => {
        console.log(data);
        this.originalData = { ...data };
        this.nombre = data.nombre;
        this.apellidoP = data.apellido_paterno;
        this.apellidoM = data.apellido_materno;
        this.email = data.correo;
        this.fechaRegistro = data.fecha_registro;
        this.pais = data.pais_id === 1 ? 'México' : 'Desconocido';

        const estado = this.estados.find((estado) => estado.id === data.estado_id);
        this.estado = estado ? estado.nombre : 'Desconocido';
        this.estadoId = estado ? estado.id : null;

        this.balance_objetivo = data.balance_objetivo;
        this.gasto_limite = data.gasto_limite;

        this.direccion = data.direccion;

        if (data.divisa === 'MXN') {
          this.salarioMXN = data.salario;
          this.salarioUSD = data.salario / 20;
        } else if (data.divisa === 'USD') {
          this.salarioMXN = data.salario * 20;
          this.salarioUSD = data.salario;
        }
      });
    } else {
      console.error('Token no encontrado en localStorage');
    }
  }

  toggleEdit(): void {
    this.isEditable = !this.isEditable;
  }

  saveChanges(): void {
    // Crear el objeto con los datos que se enviarán al backend
    const updatedData = {
      correo: this.email, // Asumimos que `email` es el valor correcto
      contrasena: null, // `contrasena` se envía como `null`
      fecha_registro: null, // `fecha_registro` también debe ser `null`
      nombre: this.nombre, // Nombre del usuario
      apellido_paterno: this.apellidoP, // Apellido paterno
      apellido_materno: this.apellidoM, // Apellido materno
      pais_id: this.pais === 'México' ? 1 : 0, // Asumimos que `1` es México
      estado_id: this.estadoId, // El id del estado seleccionado
      direccion: this.direccion, // Dirección del usuario
      salario: this.salarioMXN, // Salario en pesos
      divisa: this.salarioMXN >= this.salarioUSD ? 'MXN' : 'USD', // Determinar la divisa según el salario
      balance_objetivo: this.balance_objetivo,
      gasto_limite: this.gasto_limite,
    };


    console.log(updatedData); // Verifica los datos antes de enviarlos

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Llamada al backend para actualizar los detalles del usuario
      this.userService.updateUserDetails(updatedData, token).subscribe(
        (response) => {
          console.log('Cambios guardados correctamente');
          this.isEditable = false; // Deshabilitar edición después de guardar
        },
        (error) => {
          console.error('Error al guardar cambios:', error);
        }
      );
    } else {
      console.error('Token no encontrado en localStorage');
    }
  }

  cancelChanges(): void {
    this.nombre = this.originalData.nombre;
    this.apellidoP = this.originalData.apellido_paterno;
    this.apellidoM = this.originalData.apellido_materno;
    this.email = this.originalData.correo;
    this.direccion = this.originalData.direccion;
    this.estado = this.originalData.estado_id;
    this.estadoId = this.originalData.estado_id;
    this.salarioMXN = this.originalData.salario;
    this.salarioUSD = this.originalData.salario / 20;
    this.balance_objetivo = this.originalData.balance_objetivo;
    this.gasto_limite = this.originalData.gasto_limite;

    this.isEditable = false;
  }

}
