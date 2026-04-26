import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Evento } from '../../core/models/evento.model';
import { EventoService } from '../../core/services/evento';

@Component({
  selector: 'app-admin-eventos',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-eventos.html',
  styleUrl: './admin-eventos.css',
})
export class AdminEventos implements OnInit {
  eventos: Evento[] = [];

  formularioAbierto = false;
  modoEdicion = false;
  guardando = false;

  mensajeError = '';
  mensajeExito = '';

  tipos = ['Música', 'Tecnología', 'Entretenimiento', 'E-Sports', 'Gastronomía', 'Teatro', 'Deportes', 'Arte', 'Cine', 'Educación'];
  estados = ['ACTIVO', 'AGOTADO', 'CANCELADO'];

  eventoFormulario: Partial<Evento> = this.crearEventoVacio();

  constructor(
    private servicioEventos: EventoService,
    private detectorCambios: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.servicioEventos.obtenerEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.detectorCambios.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar eventos en admin', error);
      }
    });
  }

  abrirNuevoEvento() {
    this.modoEdicion = false;
    this.formularioAbierto = true;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.eventoFormulario = this.crearEventoVacio();
  }

  abrirEditarEvento(evento: Evento) {
    this.modoEdicion = true;
    this.formularioAbierto = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    this.servicioEventos.obtenerEventoPorId(evento.id).subscribe({
      next: (eventoDetalle) => {
        this.eventoFormulario = {
          ...eventoDetalle,
          fecha: this.convertirFechaParaInput(eventoDetalle.fecha)
        };

        this.detectorCambios.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar evento para editar', error);
      }
    });
  }

  guardarEvento() {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.eventoFormulario.titulo || !this.eventoFormulario.fecha || !this.eventoFormulario.hora) {
      this.mensajeError = 'Completa título, fecha y hora.';
      return;
    }

    this.guardando = true;

    const eventoEnviar: Partial<Evento> = {
      ...this.eventoFormulario,
      precio: Number(this.eventoFormulario.precio || 0),
      aforo: Number(this.eventoFormulario.aforo || 0),
      entradasVendidas: Number(this.eventoFormulario.entradasVendidas || 0),
      destacado: Boolean(this.eventoFormulario.destacado)
    };

    if (this.modoEdicion && this.eventoFormulario.id) {
      this.servicioEventos.actualizarEvento(this.eventoFormulario.id, eventoEnviar).subscribe({
        next: () => {
          this.guardando = false;
          this.mensajeExito = 'Evento actualizado correctamente.';
          this.formularioAbierto = false;
          this.cargarEventos();
        },
        error: (error) => {
          this.guardando = false;
          this.mensajeError = 'Error al actualizar el evento.';
          console.error('Error al actualizar evento', error);
        }
      });

      return;
    }

    this.servicioEventos.crearEvento(eventoEnviar).subscribe({
      next: () => {
        this.guardando = false;
        this.mensajeExito = 'Evento creado correctamente.';
        this.formularioAbierto = false;
        this.cargarEventos();
      },
      error: (error) => {
        this.guardando = false;
        this.mensajeError = 'Error al crear el evento.';
        console.error('Error al crear evento', error);
      }
    });
  }

  cerrarFormulario() {
    this.formularioAbierto = false;
    this.mensajeError = '';
    this.eventoFormulario = this.crearEventoVacio();
  }

  crearEventoVacio(): Partial<Evento> {
    return {
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      lugar: '',
      precio: 0,
      tipo: 'Música',
      estado: 'ACTIVO',
      aforo: 0,
      entradasVendidas: 0,
      imagen: '',
      destacado: false
    };
  }

  convertirFechaParaInput(fecha: string): string {
    if (!fecha) {
      return '';
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
      return fecha;
    }

    const partes = fecha.split(' ');

    if (partes.length < 3) {
      return fecha;
    }

    const dia = partes[0].padStart(2, '0');
    const mesTexto = partes[1].toLowerCase();
    const anio = partes[2];

    const meses: Record<string, string> = {
      ene: '01',
      feb: '02',
      mar: '03',
      abr: '04',
      may: '05',
      jun: '06',
      jul: '07',
      ago: '08',
      sept: '09',
      sep: '09',
      oct: '10',
      nov: '11',
      dic: '12'
    };

    const mes = meses[mesTexto] || '01';

    return `${anio}-${mes}-${dia}`;
  }

  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'ACTIVO': return 'badge-activo';
      case 'AGOTADO': return 'badge-agotado';
      case 'CANCELADO': return 'badge-cancelado';
      default: return '';
    }
  }
}