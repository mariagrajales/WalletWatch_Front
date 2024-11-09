import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {LandingHeaderComponent} from "../../components/landing-header/landing-header.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NzIconModule, LandingHeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {}
