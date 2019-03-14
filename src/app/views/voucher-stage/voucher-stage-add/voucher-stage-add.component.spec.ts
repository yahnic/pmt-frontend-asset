import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherStageAddComponent } from './voucher-stage-add.component';

describe('VoucherStageAddComponent', () => {
  let component: VoucherStageAddComponent;
  let fixture: ComponentFixture<VoucherStageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherStageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherStageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
