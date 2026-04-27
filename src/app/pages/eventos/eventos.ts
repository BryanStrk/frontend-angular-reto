import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  busqueda = '';

  tipos = [
    'TODOS',
    'Música',
    'Tecnología',
    'Entretenimiento',
    'E-Sports',
    'Gastronomía',
    'Teatro',
    'Deportes',
    'Arte',
    'Cine',
    'Educación'
  ];

  estados = ['TODOS', 'ACTIVO', 'AGOTADO', 'CANCELADO'];

  eventos: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventoService.obtenerEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;

        this.route.queryParams.subscribe(params => {
          this.busqueda = params['q'] || '';
          this.cdr.detectChanges();
        });
      },
      error: (error) => {
        console.error('Error al cargar eventos', error);
      }
    });
  }

  get eventosFiltrados() {
    const texto = this.busqueda.toLowerCase().trim();

    return this.eventos.filter(e => {
      const matchBusqueda =
        !texto ||
        e.titulo.toLowerCase().includes(texto) ||
        e.lugar.toLowerCase().includes(texto) ||
        e.tipo.toLowerCase().includes(texto);

      const matchEstado =
        this.filtroEstado === 'TODOS' || e.estado === this.filtroEstado;

      const matchTipo =
        this.filtroTipo === 'TODOS' || e.tipo === this.filtroTipo;

      const matchPrecio = e.precio <= this.precioMax;

      return matchBusqueda && matchEstado && matchTipo && matchPrecio;
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