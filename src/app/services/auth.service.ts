import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Asegúrate del path correcto

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiBaseUrl; // URL base del backend

  constructor(private http: HttpClient) {}

  // Método de registro
  register(userData: any): Observable<any> {
    const url = `${this.apiUrl}/auth/register`; // Endpoint completo
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, userData, { headers });
  }

  login(credentials: { correo: string; contrasena: string }): Observable<any> {
    const url = `${this.apiUrl}/auth/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, credentials, { headers });
  }

}
