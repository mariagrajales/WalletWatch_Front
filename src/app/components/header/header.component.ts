import { Component } from '@angular/core';
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {NgIf} from "@angular/common";

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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
