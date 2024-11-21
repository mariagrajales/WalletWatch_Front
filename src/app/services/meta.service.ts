import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importar el archivo de entorno

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private apiUrl = `${environment.apiBaseUrl}/financial/metas`; // Usar la base URL del entorno

  constructor(private http: HttpClient) {}

  createMeta(meta: any): Observable<any> {
    return this.http.post(this.apiUrl, meta);
  }
}
