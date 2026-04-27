import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollRef') scrollRef!: ElementRef;

  eventosDestacados: Evento[] = [];

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventoService.obtenerEventosDestacados().subscribe({
      next: (eventos) => {
        this.eventosDestacados = eventos;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar eventos destacados', error);
      }
    });
  }

  buscarEventos(texto: string) {
    const busqueda = texto.trim();

    if (!busqueda) {
      this.router.navigate(['/eventos']);
      return;
    }

    this.router.navigate(['/eventos'], {
      queryParams: { q: busqueda }
    });
  }

  scrollLeft() {
    this.scrollRef.nativeElement.scrollBy({ left: -400, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollRef.nativeElement.scrollBy({ left: 400, behavior: 'smooth' });
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