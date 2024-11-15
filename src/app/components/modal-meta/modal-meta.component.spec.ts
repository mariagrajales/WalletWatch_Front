import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMetaComponent } from './modal-meta.component';

describe('ModalMetaComponent', () => {
  let component: ModalMetaComponent;
  let fixture: ComponentFixture<ModalMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
