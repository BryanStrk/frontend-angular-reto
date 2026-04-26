import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost:8082/api/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos() {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  obtenerEventosDestacados() {
    return this.http.get<Evento[]>(`${this.apiUrl}/destacados`);
  }

  obtenerEventoPorId(id: number) {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  crearEvento(evento: Partial<Evento>) {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  actualizarEvento(id: number, evento: Partial<Evento>) {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }
}