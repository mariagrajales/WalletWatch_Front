import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {LandingPageComponent} from "./pages/landing-page/landing-page.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Ruta principal a la landing page
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: NotFoundComponent }
];
