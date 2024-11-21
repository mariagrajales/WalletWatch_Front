import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAbonoComponent } from './modal-abono.component';

describe('ModalAbonoComponent', () => {
  let component: ModalAbonoComponent;
  let fixture: ComponentFixture<ModalAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAbonoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
