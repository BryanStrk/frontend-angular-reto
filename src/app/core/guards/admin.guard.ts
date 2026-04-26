import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuarioGuardado = localStorage.getItem('usuario');

  if (!usuarioGuardado) {
    router.navigate(['/login']);
    return false;
  }

  const usuario = JSON.parse(usuarioGuardado);

  if (usuario.rol === 'ADMIN') {
    return true;
  }

  router.navigate(['/']);
  return false;
};