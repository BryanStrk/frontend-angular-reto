import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrearReserva, Reserva } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = 'http://217.154.181.229:8082/api/reservas';

  constructor(private http: HttpClient) {}

  obtenerReservasPorUsuario(usuarioId: number) {
    return this.http.get<Reserva[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  crearReserva(datos: CrearReserva) {
    return this.http.post<Reserva>(this.apiUrl, datos);
  }

  cancelarReserva(id: number) {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}/cancelar`, {});
  }
}