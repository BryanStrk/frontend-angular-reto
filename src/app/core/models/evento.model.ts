export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  hora: string;
  lugar: string;
  precio: number;
  tipo: string;
  estado: string;
  aforo: number;
  entradasVendidas: number;
  imagen: string;
  destacado: boolean;
}