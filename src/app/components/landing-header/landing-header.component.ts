import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-landing-header',
  standalone: true,
  imports: [
    NzButtonComponent
  ],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.css'
})
export class LandingHeaderComponent {

}
