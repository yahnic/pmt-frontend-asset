import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherStageComponent } from './voucher-stage.component';

describe('VoucherStageComponent', () => {
  let component: VoucherStageComponent;
  let fixture: ComponentFixture<VoucherStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
