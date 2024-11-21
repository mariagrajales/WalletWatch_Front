import { Component } from '@angular/core';
import {NzAvatarComponent} from "ng-zorro-antd/avatar";

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  imports: [
    NzAvatarComponent
  ],
  standalone: true
})
export class PerfilUsuarioComponent {
  // Declaración de propiedades
  nombre: string = 'Juan';
  apellidoP: string = 'Pérez';
  apellidoM: string = 'Domínguez';
  email: string = 'juan.perez@example.com';
  telefono: string = '555-123-4567';
  username: string = 'juanperez';
  fechaRegistro: string = '01/01/2023';
  salarioMXN: number = 25000;
  salarioUSD: number = 1250;
  pais: string = 'México';
  estado: string = 'Ciudad de México';
  direccion: string = 'Av. Reforma 123, Col. Centro, CP 06000';

  // Getter para concatenar el nombre completo
  get fullName(): string {
    return `${this.nombre} ${this.apellidoP} ${this.apellidoM}`;
  }
}
