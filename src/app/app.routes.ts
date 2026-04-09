    import { Routes } from '@angular/router';
    import { HomeComponent } from './pages/home/home';
    import { EventosComponent } from './pages/eventos/eventos';
    import { EventoDetalleComponent } from './pages/evento-detalle/evento-detalle';
    import { MisReservasComponent } from './pages/mis-reservas/mis-reservas';

    export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'eventos', component: EventosComponent },
    { path: 'eventos/:id', component: EventoDetalleComponent },
    { path: 'mis-reservas', component: MisReservasComponent },
    { path: '**', redirectTo: '' }
    ];