import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalMetaComponent } from '../../components/modal-meta/modal-meta.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardProgresoComponent } from '../../components/card-progreso/card-progreso.component';
import { DatePipe, NgForOf } from '@angular/common';
import { MetaService } from '../../services/meta.service';
import { Router } from '@angular/router';
import { EditMetaComponent } from "../../components/edit-meta/edit-meta.component";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    NzIconModule,
    MatButtonModule,
    CardProgresoComponent,
    NgForOf,
  ],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  @ViewChild(CardProgresoComponent) cardProgreso: CardProgresoComponent | undefined;
  metas: any[] = [];

  constructor(
    private message: NzMessageService,
    private dialog: MatDialog,
    private metaService: MetaService,
    private router: Router,
    public datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.cargarMetas(token); // Llamar al método de carga si hay un token
    } else {
      alert('No estás autenticado. Inicia sesión.');
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    // Puedes acceder a la referencia del componente `app-card-progreso` aquí.
    if (this.cardProgreso) {
      console.log(this.cardProgreso); // Verifica que la referencia funcione
    }
  }



  // Método para cargar las metas desde el backend
  cargarMetas(token: string): void {
    this.metaService.getMetas(token).subscribe({
      next: (response) => {
        this.metas = response;  // Asignamos la respuesta al array de metas
        console.log('Metas cargadas:', this.metas);
      },
      error: (error) => {
        console.error('Error al cargar las metas:', error);
        this.message.create('error','Hubo un error al cargar las Metas');
      }
    });
  }

  onMetaUpdated(): void {
    this.cargarMetas(localStorage.getItem('token') || '');
  }

  openModal(): void {
    this.dialog.open(ModalMetaComponent, {
      width: '425px',
      panelClass: 'custom-dialog-container',
    });
  }
}
