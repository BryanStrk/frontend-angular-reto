import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento';
import { ReservaService } from '../../core/services/reserva';

@Component({
  selector: 'app-evento-detalle',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './evento-detalle.html',
  styleUrl: './evento-detalle.css'
})
export class EventoDetalleComponent implements OnInit {
  cantidadEntradas = 1;
  evento: Evento | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private eventoService: EventoService,
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventoService.obtenerEventoPorId(id).subscribe({
      next: (evento) => {
        this.evento = evento;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar detalle del evento', error);
      }
    });
  }

  getHeroStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.evento?.imagen || ''})`);
  }

  get totalPrecio(): number {
    return this.evento ? this.evento.precio * this.cantidadEntradas : 0;
  }

  get lugaresDisponibles(): number {
    return this.evento ? this.evento.aforo - this.evento.entradasVendidas : 0;
  }

  incrementar() {
    if (this.cantidadEntradas < 10 && this.cantidadEntradas < this.lugaresDisponibles) {
      this.cantidadEntradas++;
    }
  }

  decrementar() {
    if (this.cantidadEntradas > 1) {
      this.cantidadEntradas--;
    }
  }

  reservar() {
    if (!this.evento) {
      return;
    }

    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      this.router.navigate(['/login']);
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    this.reservaService.crearReserva({
      usuarioId: usuario.id,
      eventoId: this.evento.id,
      numEntradas: this.cantidadEntradas
    }).subscribe({
      next: () => {
        this.router.navigate(['/mis-reservas']);
      },
      error: (error) => {
        console.error('Error al crear reserva', error);
      }
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