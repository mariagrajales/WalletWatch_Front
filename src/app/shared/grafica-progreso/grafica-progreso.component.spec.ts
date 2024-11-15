import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaProgresoComponent } from './grafica-progreso.component';

describe('GraficaProgresoComponent', () => {
  let component: GraficaProgresoComponent;
  let fixture: ComponentFixture<GraficaProgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficaProgresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficaProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
