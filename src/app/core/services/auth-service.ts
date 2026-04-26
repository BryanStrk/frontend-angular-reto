import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseDto, RegistroUsuarioDto, UsuarioLoginDto } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://217.154.181.229:8082/auth';

  constructor(private http: HttpClient) {}

  login(datos: UsuarioLoginDto) {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, datos);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  registrar(datos: RegistroUsuarioDto) {
  return this.http.post<AuthResponseDto>(`${this.apiUrl}/register`, datos);
}
}