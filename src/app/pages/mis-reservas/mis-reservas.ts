import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-reservas',
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css'
})
export class MisReservasComponent {
  reservas = [
    { id: 1, evento: 'Concierto Rock Fest 2026', fecha: '15 jun 2026', hora: '18:00', lugar: 'Estadio Nacional, Madrid', entradas: 2, precio: 85, estado: 'CONFIRMADA', imagen: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=200' },
    { id: 2, evento: 'Conferencia Tech Summit 2026', fecha: '10 jul 2026', hora: '09:00', lugar: 'Centro de Convenciones, Valencia', entradas: 1, precio: 150, estado: 'CONFIRMADA', imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200' },
    { id: 3, evento: 'Stand-up Comedy Night', fecha: '25 abr 2026', hora: '21:00', lugar: 'Club de Comedia, Sevilla', entradas: 3, precio: 30, estado: 'CANCELADA', imagen: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=200' },
  ];

  get totalReservas(): number { return this.reservas.length; }
  get reservasActivas(): number { return this.reservas.filter(r => r.estado === 'CONFIRMADA').length; }
  get totalGastado(): number { return this.reservas.filter(r => r.estado === 'CONFIRMADA').reduce((acc, r) => acc + (r.precio * r.entradas), 0); }

  getBadgeClass(estado: string): string {
    return estado === 'CONFIRMADA' ? 'badge-activo' : 'badge-cancelado';
  }

  cancelar(id: number) {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva) reserva.estado = 'CANCELADA';
  }
}