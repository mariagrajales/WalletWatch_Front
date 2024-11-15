import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-ayuda',
  standalone: true,
  templateUrl: './card-ayuda.component.html',
  styleUrls: ['./card-ayuda.component.css']
})
export class CardAyudaComponent {
  @Input() iconPath!: string;
  @Input() iconColor: string = '#ffffff'; // Default icon color
  @Input() title!: string;
  @Input() description!: string;
}
