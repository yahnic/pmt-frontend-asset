import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherStageEditComponent } from './voucher-stage-edit.component';

describe('VoucherStageEditComponent', () => {
  let component: VoucherStageEditComponent;
  let fixture: ComponentFixture<VoucherStageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherStageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherStageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
