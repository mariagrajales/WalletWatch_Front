import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalMetaComponent } from '../../components/modal-meta/modal-meta.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatButtonModule } from '@angular/material/button';
import {CardProgresoComponent} from "../../components/card-progreso/card-progreso.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatDialogModule, NzIconModule, MatButtonModule, CardProgresoComponent], // Cambiado a NzIconModule
})
export class DashboardComponent {
  constructor(private dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(ModalMetaComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
    });
  }
}
