import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtWaybillComponent } from './pmt-waybill.component';

describe('PmtWaybillComponent', () => {
  let component: PmtWaybillComponent;
  let fixture: ComponentFixture<PmtWaybillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtWaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtWaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
