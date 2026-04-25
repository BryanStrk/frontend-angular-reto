import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Reserva } from '../../core/models/reserva.model';
import { ReservaService } from '../../core/services/reserva';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css'
})
export class MisReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(
    private reservaService: ReservaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    this.reservaService.obtenerReservasPorUsuario(usuario.id).subscribe({
      next: (reservas) => {
        this.reservas = reservas.filter(r => r.estado === 'CONFIRMADA');
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar reservas', error);
      }
    });
  }

  get totalReservas(): number {
    return this.reservas.length;
  }

  get reservasActivas(): number {
    return this.reservas.filter(r => r.estado === 'CONFIRMADA').length;
  }

  get totalGastado(): number {
    return this.reservas
      .filter(r => r.estado === 'CONFIRMADA')
      .reduce((acc, r) => acc + (r.precio * r.entradas), 0);
  }

  getBadgeClass(estado: string): string {
    return estado === 'CONFIRMADA' ? 'badge-activo' : 'badge-cancelado';
  }

  cancelar(id: number) {
    this.reservaService.cancelarReserva(id).subscribe({
      next: (reservaActualizada) => {
        const index = this.reservas.findIndex(r => r.id === id);

        if (index !== -1) {
          this.reservas[index] = reservaActualizada;
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cancelar reserva', error);
      }
    });
  }
}