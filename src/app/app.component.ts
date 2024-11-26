import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NgIf } from '@angular/common';
import player from 'lottie-web';
import {FooterComponent} from "./components/footer/footer.component";
export function playerFactory() {
  return player;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    NgIf,
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wallet-watch';

  constructor(private router: Router) {}

  shouldShowHeader(): boolean {
    const excludedRoutes = ['/', '/login', '/register', '/landing'];
    return !excludedRoutes.includes(this.router.url);
  }
}
