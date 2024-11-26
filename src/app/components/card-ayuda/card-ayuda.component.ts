import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-ayuda',
  templateUrl: './card-ayuda.component.html',
  standalone: true,
  styleUrls: ['./card-ayuda.component.css']
})
export class CardAyudaComponent {
  @Input() iconType: string = '';  // Recibir el tipo de ícono
  @Input() iconColor: string = '#ffff';  // Color por defecto
  @Input() title: string = '';
  @Input() description: string = '';

  // Definir el tipo de iconPaths con una firma de índice
  iconPaths: { [key: string]: string } = {
    'bank': 'assets/ahorrar_tiempo.svg',
    'appstore': 'assets/facil_uso.svg',
    'safety': 'assets/seguro.svg',
  };

  // Getter para obtener el iconPath basado en el tipo de ícono
  get iconPath(): string {
    return this.iconPaths[this.iconType] || ''; // Devuelve la ruta SVG para el icono correspondiente
  }
}
