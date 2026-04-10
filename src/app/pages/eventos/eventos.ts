import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class EventosComponent {
  filtrosAbiertos = true;
  filtroEstado = 'TODOS';
  filtroTipo = 'TODOS';
  precioMax = 200;

  tipos = ['Todos', 'Música', 'Tecnología', 'Entretenimiento', 'E-Sports', 'Gastronomía', 'Teatro', 'Deportes', 'Arte', 'Cine', 'Educación'];
  estados = ['TODOS', 'ACTIVO', 'AGOTADO', 'CANCELADO'];

  eventos = [
    { id: 1, titulo: 'Concierto Rock Fest 2026', fecha: '15 jun 2026', hora: '18:00', lugar: 'Estadio Nacional, Madrid', precio: 85, tipo: 'Música', estado: 'ACTIVO', aforo: 450, imagen: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600' },
    { id: 2, titulo: 'Festival de Jazz Internacional', fecha: '20 may 2026', hora: '20:30', lugar: 'Teatro Real, Barcelona', precio: 65, tipo: 'Música', estado: 'AGOTADO', aforo: 0, imagen: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600' },
    { id: 3, titulo: 'Conferencia Tech Summit 2026', fecha: '10 jul 2026', hora: '09:00', lugar: 'Centro de Convenciones, Valencia', precio: 150, tipo: 'Tecnología', estado: 'ACTIVO', aforo: 280, imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
    { id: 4, titulo: 'Stand-up Comedy Night', fecha: '25 abr 2026', hora: '21:00', lugar: 'Club de Comedia, Sevilla', precio: 30, tipo: 'Entretenimiento', estado: 'ACTIVO', aforo: 120, imagen: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=600' },
    { id: 5, titulo: 'Torneo E-Sports Championship', fecha: '5 ago 2026', hora: '16:00', lugar: 'Arena Gaming, Bilbao', precio: 40, tipo: 'E-Sports', estado: 'AGOTADO', aforo: 0, imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600' },
    { id: 6, titulo: 'Festival Gastronómico', fecha: '12 sept 2026', hora: '12:00', lugar: 'Parque Central, Málaga', precio: 55, tipo: 'Gastronomía', estado: 'CANCELADO', aforo: 0, imagen: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600' },
  ];

  get eventosFiltrados() {
    return this.eventos.filter(e => {
      const matchEstado = this.filtroEstado === 'TODOS' || e.estado === this.filtroEstado;
      const matchTipo = this.filtroTipo === 'TODOS' || e.tipo === this.filtroTipo;
      const matchPrecio = e.precio <= this.precioMax;
      return matchEstado && matchTipo && matchPrecio;
    });
  }

  getBadgeClass(estado: string): string {
    switch(estado) {
      case 'ACTIVO': return 'badge-activo';
      case 'AGOTADO': return 'badge-agotado';
      case 'CANCELADO': return 'badge-cancelado';
      default: return '';
    }
  }
}