import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  telefono: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar() {
    this.error = '';

    this.authService.registrar({
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      password: this.password,
      telefono: this.telefono
    }).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.token);
        localStorage.setItem('usuario', JSON.stringify(respuesta.user));

        this.router.navigate(['/eventos']);
      },
      error: (error) => {
        this.error = error.error || 'Error al registrar usuario';
      }
    });
  }
}