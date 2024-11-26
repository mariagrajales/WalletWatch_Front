import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';  // Importar el servicio de gasto
import { NzTagModule } from "ng-zorro-antd/tag";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { GraficaGastoComponent } from "../../shared/grafica-gasto/grafica-gasto.component";
import { FormsModule } from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RegistrarGastoComponent} from "../../components/registrar-gasto/registrar-gasto.component";
import {CrearCategoriaComponent} from "../../components/crear-categoria/crear-categoria.component";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzMessageService} from "ng-zorro-antd/message";

interface Categoria {
  nombre: string;
  expandido: boolean;
  gasto_total: number;  // Usando el nombre correcto
  gasto_actual: number;  // Usando el nombre correcto
  limite_gasto: number;  // Usando el nombre correcto
  periodo: string;
  _id: string;  // Asegúrate de que la propiedad _id esté presente en cada categoría
}
@Component({
  selector: 'app-dashboard-gastos',
  templateUrl: './dashboard-gastos.component.html',
  styleUrls: ['./dashboard-gastos.component.css'],
  standalone: true,
  imports: [NzTagModule, NgIf, GraficaGastoComponent, NgForOf, NgClass, FormsModule, NzPopconfirmDirective],
})
export class DashboardGastosComponent implements OnInit {
  categorias: Categoria[] = [];  // Array de tipo Categoria
  periodOptions = [
    { value: 0.25, name: 'Última Semana' },
    { value: 0.5, name: '15 días' },
    { value: 1, name: 'Un mes' },
    { value: 3, name: 'Tres meses' },
    { value: 6, name: 'Seis meses' },
    { value: 12, name: 'Un año' },
  ];



  selectedPeriod: number = 1;  // Valor inicial del período
  filteredCategorias: Categoria[] = [];  // Categorías filtradas según el período seleccionado

  constructor(
    private message: NzMessageService,
    private gastoService: GastoService,  // Inyectamos el servicio de gasto
    private dialog: MatDialog  // Inyectamos MatDialog
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.filterByPeriod();  // Llamar al filtro al inicio
    } else {
      alert('No estás autenticado. Inicia sesión.');
    }
  }


  eliminarCategoria(categoriaId: string): void {
    const token = localStorage.getItem('token') || '';

    if (!token) {
      alert('No se encontró un token válido. Por favor, inicie sesión.');
      return;
    }

    this.gastoService.eliminarCategoria(categoriaId, token).subscribe({
      next: () => {
        this.message.create('success', 'Categoría eliminada con éxito');
        this.filterByPeriod();  // Actualiza las categorías después de eliminar una
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
        this.message.create('error', 'Hubo un error al eliminar la categoría. Intenta nuevamente.');
      }
    });
  }


  stopEvent(event: MouseEvent): void {
    event.stopPropagation();
  }

  // Función para filtrar las categorías por el período
  filterByPeriod(): void {
    const token = localStorage.getItem('token') || '';
    this.gastoService.getCategoriasByPeriodo(this.selectedPeriod, token).subscribe({
      next: (response) => {
        console.log('Datos recibidos:', response); // Aquí verás los datos que llegan
        this.categorias = response;
        this.filteredCategorias = [...this.categorias];  // Filtramos las categorías
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
        this.message.create('error', 'Hubo un error al cargar las categorías.');
      }
    });
  }

  toggleCategoria(categoria: Categoria): void {
    categoria.expandido = !categoria.expandido;
  }

  getTagColor(gastoActual: number, gastoTotal: number): string {
    const progreso = (gastoActual / gastoTotal) * 100;
    if (progreso < 75) {
      return 'green'; // Verde si es menos del 75%
    } else if (progreso < 100) {
      return 'orange'; // Naranja si está entre 75% y 99%
    } else {
      return 'red'; // Rojo si es 100% o más
    }
  }

  getTagMessage(gastoActual: number, gastoTotal: number): string {
    const progreso = (gastoActual / gastoTotal) * 100;
    if (progreso < 75) {
      return 'Buen progreso, aún tienes margen para gastar.';
    } else if (progreso < 100) {
      return 'Advertencia: estás cerca de alcanzar el límite.';
    } else {
      return `¡Has excedido el límite de tu gasto para el periodo!`;
    }
  }

  openRegistrarGastoModal(categoriaId: string): void {
    const dialogRef = this.dialog.open(RegistrarGastoComponent, {
      width: '400px',  // Ajusta el tamaño del modal según lo necesites
      data: { id: categoriaId }  // Enviar el ID de la categoría seleccionada al modal
    });

    dialogRef.componentInstance.gastoRegistrado.subscribe(() => {
      this.filterByPeriod(); // Actualizamos la lista de categorías cuando el gasto se registra
    });
  }

  openCreateCategoryModal(): void {
    const dialogRef = this.dialog.open(CrearCategoriaComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.componentInstance.categoriaRegistrada.subscribe(() => {
      this.filterByPeriod(); // Actualizamos la lista de categorías cuando el gasto se registra
    });
  }
}
