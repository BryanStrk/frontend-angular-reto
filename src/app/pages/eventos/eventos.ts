import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento';

@Component({
  selector: 'app-eventos',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class EventosComponent implements OnInit {
  filtrosAbiertos = false;
  filtroEstado = 'TODOS';
  filtroTipo = 'TODOS';
  precioMax = 200;

  tipos = ['TODOS', 'Música', 'Tecnología', 'Entretenimiento', 'E-Sports', 'Gastronomía', 'Teatro', 'Deportes', 'Arte', 'Cine', 'Educación'];os = ['Todos', 'Música', 'Tecnología', 'Entretenimiento', 'E-Sports', 'Gastronomía', 'Teatro', 'Deportes', 'Arte', 'Cine', 'Educación'];
  estados = ['TODOS', 'ACTIVO', 'AGOTADO', 'CANCELADO'];

  eventos: Evento[] = [];

  constructor(
  private eventoService: EventoService,
  private cdr: ChangeDetectorRef
) {}

ngOnInit() {
  this.eventoService.obtenerEventos().subscribe({
    next: (eventos) => {
      this.eventos = eventos;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al cargar eventos', error);
    }
  });
}

  get eventosFiltrados() {
    return this.eventos.filter(e => {
      const matchEstado = this.filtroEstado === 'TODOS' || e.estado === this.filtroEstado;
      const matchTipo = this.filtroTipo === 'TODOS' || e.tipo === this.filtroTipo;
      const matchPrecio = e.precio <= this.precioMax;

      return matchEstado && matchTipo && matchPrecio;
    });
  }

  getBadgeClass(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'badge-activo';
      case 'AGOTADO': return 'badge-agotado';
      case 'CANCELADO': return 'badge-cancelado';
      default: return '';
    }
  }
}