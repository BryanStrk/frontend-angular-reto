import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
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
    private cdr: ChangeDetectorRef
  ) { }

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