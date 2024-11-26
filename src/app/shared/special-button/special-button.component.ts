import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-special-button',
  standalone: true,
  templateUrl: './special-button.component.html',
  styleUrls: ['./special-button.component.css']
})
export class SpecialButtonComponent {
  @Input() label: string = 'Button'; // Texto del botón
  @Input() disabled: boolean = false; // Nueva propiedad para deshabilitar el botón
  @Output() action = new EventEmitter<void>(); // Evento para manejar la acción al hacer clic

  onClick() {
    if (!this.disabled) {
      this.action.emit(); // Emitimos el evento cuando el botón no está deshabilitado
    }
  }
}
