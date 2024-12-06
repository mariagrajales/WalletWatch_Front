import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ResumenService {
  private apiUrl = `${environment.apiBaseUrl}/financial/datos/resumen`;

  constructor(private http: HttpClient) {}

  getResumen(periodo: number, token: string): Observable<any> {
    const params = new HttpParams().set('periodo', periodo.toString());
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
