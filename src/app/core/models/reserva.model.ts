export interface Reserva {
  id: number;
  usuarioId: number;
  eventoId: number;
  evento: string;
  fecha: string;
  hora: string;
  lugar: string;
  entradas: number;
  precio: number;
  estado: string;
  imagen: string;
  fechaReserva: string;
}

export interface CrearReserva {
  usuarioId: number;
  eventoId: number;
  numEntradas: number;
}