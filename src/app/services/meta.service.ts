import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private apiUrl = `${environment.apiBaseUrl}/financial/metas`;
  private apiIngresos = `${environment.apiBaseUrl}/financial/ingresos`;

  constructor(private http: HttpClient) {}

  createMeta(meta: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, meta, { headers });
  }

  getMetas(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  updateMeta(metaId: string, meta: any): Observable<any> {
    const url = `${this.apiUrl}/${metaId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(url, meta, { headers });
  }

  abonarMeta(metaId: string, monto: number, token: string): Observable<any> {
    const url = `${this.apiUrl}/${metaId}/abono`; // La URL debe incluir el `meta_id`
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(url, {}, {
      params: {
        monto: monto.toString(),
      },
      headers: headers,
    });
  }

  eliminarMeta(metaId: string, token: string): Observable<any> {
    const url = `${this.apiUrl}/${metaId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete(url, { headers });
  }

  getUltimosAbonos(metaId: string, token: string, limit: number = 3): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    // Modificar la URI para incluir el nuevo endpoint
    return this.http.get<any[]>(`${this.apiIngresos}/${metaId}?limit=${limit}`, { headers });
  }


}
