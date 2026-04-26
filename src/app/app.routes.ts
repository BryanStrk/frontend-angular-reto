    import { Routes } from '@angular/router';
    import { HomeComponent } from './pages/home/home';
    import { EventosComponent } from './pages/eventos/eventos';
    import { EventoDetalleComponent } from './pages/evento-detalle/evento-detalle';
    import { MisReservasComponent } from './pages/mis-reservas/mis-reservas';
    import { LoginComponent } from './pages/login/login';
    import { RegisterComponent } from './pages/register/register';
    import { adminGuard } from './core/guards/admin.guard';
    import { AdminEventos } from './pages/admin-eventos/admin-eventos';

    export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path:'login', component: LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'eventos', component: EventosComponent },
    { path: 'eventos/:id', component: EventoDetalleComponent },
    { path: 'mis-reservas', component: MisReservasComponent },
    { path: 'admin/eventos', component:AdminEventos, canActivate: [adminGuard]},

    { path: '**', redirectTo: '' }
    ];