import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {LandingHeaderComponent} from "../../components/landing-header/landing-header.component";
import {CardAyudaComponent} from "../../components/card-ayuda/card-ayuda.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NzIconModule, LandingHeaderComponent, CardAyudaComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {}
