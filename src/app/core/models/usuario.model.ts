export interface Usuario {
  id?: number;
  nombre: string;
  apellidos?: string;
  email: string;
  telefono?: string;
  activo?: boolean;
  fechaRegistro?: string;
}