import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GastoService {
  private apiUrl = `${environment.apiBaseUrl}/financial/categorias`;
  private gastosUrl = `${environment.apiBaseUrl}/financial/gastos`;

  constructor(private http: HttpClient) {}

  getCategoriasByPeriodo(periodo: number, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(`${this.apiUrl}?periodo=${periodo}`, { headers });
  }

  registrarGasto(gasto: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.gastosUrl, gasto, { headers });
  }

  crearCategoria(categoria: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, categoria, { headers });
  }

  eliminarCategoria(categoriaId: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/${categoriaId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }


}
