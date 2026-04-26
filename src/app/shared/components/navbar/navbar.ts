import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private router: Router) {}

  estaLogueado(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerNombreUsuario(): string {
    const usuario = localStorage.getItem('usuario');

    if (!usuario) {
      return '';
    }

    return JSON.parse(usuario).nombre;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  obtenerRolUsuario(): string {
  const usuarioGuardado = localStorage.getItem('usuario');

  if (!usuarioGuardado) {
    return '';
  }

  return JSON.parse(usuarioGuardado).rol;
}
}