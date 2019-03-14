import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDetailComponent } from './voucher-detail.component';

describe('VoucherDetailComponent', () => {
  let component: VoucherDetailComponent;
  let fixture: ComponentFixture<VoucherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
