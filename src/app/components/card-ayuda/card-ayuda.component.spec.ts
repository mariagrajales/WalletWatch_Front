import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAyudaComponent } from './card-ayuda.component';

describe('CardAyudaComponent', () => {
  let component: CardAyudaComponent;
  let fixture: ComponentFixture<CardAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
