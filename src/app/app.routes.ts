import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {PerfilUsuarioComponent} from "./pages/perfil-usuario/perfil-usuario.component";
import {DashboardGastosComponent} from "./pages/dashboard-gastos/dashboard-gastos.component";
import {DashboardResumenComponent} from "./pages/dashboard-resumen/dashboard-resumen.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'perfil', component: PerfilUsuarioComponent },
  { path: 'dashboard-gastos', component: DashboardGastosComponent },
  { path: 'dashboard-resumen', component: DashboardResumenComponent },
  { path: '**', component: NotFoundComponent }
];
