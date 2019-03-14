import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmlWaybillComponent } from './pml-waybill.component';

describe('PmlWaybillComponent', () => {
  let component: PmlWaybillComponent;
  let fixture: ComponentFixture<PmlWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmlWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmlWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
