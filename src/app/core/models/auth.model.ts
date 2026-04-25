export interface UsuarioLoginDto {
  email: string;
  password: string;
}

export interface RegistroUsuarioDto {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  telefono: string;
}

export interface UsuarioDto {
  nombre: string;
}

export interface AuthResponseDto {
  token: string;
  user: UsuarioDto;
}