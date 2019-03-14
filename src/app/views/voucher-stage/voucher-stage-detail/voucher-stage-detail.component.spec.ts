import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherStageDetailComponent } from './voucher-stage-detail.component';

describe('VoucherStageDetailComponent', () => {
  let component: VoucherStageDetailComponent;
  let fixture: ComponentFixture<VoucherStageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherStageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherStageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
