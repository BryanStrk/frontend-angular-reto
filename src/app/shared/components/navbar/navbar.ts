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
  menuAbierto = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

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

  obtenerRolUsuario(): string {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      return '';
    }

    return JSON.parse(usuarioGuardado).rol;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.cerrarMenu();
    this.router.navigate(['/login']);
  }
}