import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProgresoComponent } from './card-progreso.component';

describe('CardProgresoComponent', () => {
  let component: CardProgresoComponent;
  let fixture: ComponentFixture<CardProgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProgresoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
