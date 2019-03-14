import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherEditComponent } from './voucher-edit.component';

describe('VoucherEditComponent', () => {
  let component: VoucherEditComponent;
  let fixture: ComponentFixture<VoucherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
