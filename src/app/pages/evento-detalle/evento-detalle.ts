import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-evento-detalle',
  imports: [RouterLink, CommonModule ,FormsModule],
  templateUrl: './evento-detalle.html',
  styleUrl: './evento-detalle.css'
})
export class EventoDetalleComponent implements OnInit {
  cantidadEntradas = 1;
  evento: any = null;

  eventos = [
    { id: 1, titulo: 'Concierto Rock Fest 2026', descripcion: 'El festival de rock más grande del año. Artistas internacionales, escenarios espectaculares y una noche inolvidable.', fecha: '15 jun 2026', hora: '18:00', lugar: 'Estadio Nacional, Madrid', precio: 85, tipo: 'Música', estado: 'ACTIVO', aforo: 450, entradasVendidas: 150, imagen: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200' },
    { id: 2, titulo: 'Festival de Jazz Internacional', descripcion: 'Una noche mágica con los mejores músicos de jazz del mundo en un entorno incomparable.', fecha: '20 may 2026', hora: '20:30', lugar: 'Teatro Real, Barcelona', precio: 65, tipo: 'Música', estado: 'AGOTADO', aforo: 300, entradasVendidas: 300, imagen: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200' },
    { id: 3, titulo: 'Conferencia Tech Summit 2026', descripcion: 'El evento tecnológico del año. Ponentes de las mejores empresas del sector, workshops y networking.', fecha: '10 jul 2026', hora: '09:00', lugar: 'Centro de Convenciones, Valencia', precio: 150, tipo: 'Tecnología', estado: 'ACTIVO', aforo: 500, entradasVendidas: 220, imagen: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200' },
    { id: 4, titulo: 'Stand-up Comedy Night', descripcion: 'Una noche de risas garantizadas con los mejores cómicos del panorama nacional.', fecha: '25 abr 2026', hora: '21:00', lugar: 'Club de Comedia, Sevilla', precio: 30, tipo: 'Entretenimiento', estado: 'ACTIVO', aforo: 200, entradasVendidas: 80, imagen: 'https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=1200' },
  ];

  

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  getHeroStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.evento.imagen})`);
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evento = this.eventos.find(e => e.id === id) || this.eventos[0];
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
    if (this.cantidadEntradas > 1) this.cantidadEntradas--;
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