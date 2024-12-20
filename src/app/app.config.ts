// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import {icons} from "./icons-provider";
import {es_ES, NZ_I18N} from "ng-zorro-antd/i18n";
import {NzModalService} from "ng-zorro-antd/modal";


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_I18N, useValue: es_ES },
    NzModalService,
  ]
};
