import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NzButtonModule, NzResultModule, RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {}
