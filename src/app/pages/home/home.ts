import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  @ViewChild('scrollRef') scrollRef!: ElementRef;

  eventosDestacados = [
    { id: 1, titulo: 'Concierto Rock Fest 2026', fecha: '15 jun 2026', hora: '18:00', lugar: 'Estadio Nacional, Madrid', precio: 85, tipo: 'Música', estado: 'ACTIVO', aforo: 450, imagen: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600' },
    { id: 2, titulo: 'Festival de Jazz Internacional', fecha: '20 may 2026', hora: '20:30', lugar: 'Teatro Real, Barcelona', precio: 65, tipo: 'Música', estado: 'AGOTADO', aforo: 0, imagen: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600' },
    { id: 3, titulo: 'Conferencia Tech Summit 2026', fecha: '10 jul 2026', hora: '09:00', lugar: 'Centro de Convenciones, Valencia', precio: 150, tipo: 'Tecnología', estado: 'ACTIVO', aforo: 280, imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600' },
    { id: 4, titulo: 'Stand-up Comedy Night', fecha: '25 abr 2026', hora: '21:00', lugar: 'Club de Comedia, Sevilla', precio: 30, tipo: 'Entretenimiento', estado: 'ACTIVO', aforo: 120, imagen: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=600' },
  ];

  scrollLeft() {
    this.scrollRef.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollRef.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
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