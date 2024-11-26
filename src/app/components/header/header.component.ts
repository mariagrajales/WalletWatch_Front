import { Component } from '@angular/core';
import { NzAvatarComponent } from "ng-zorro-antd/avatar";
import { NgIf } from "@angular/common";
import { Router } from '@angular/router';  // Importar el Router de Angular

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    NzAvatarComponent,
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.removeItem('token');

    // Redirigir a la página de inicio o login
    this.router.navigate(['/']);
  }
}
