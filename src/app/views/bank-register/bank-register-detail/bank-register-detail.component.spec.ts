import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRegisterDetailComponent } from './bank-register-detail.component';

describe('BankRegisterDetailComponent', () => {
  let component: BankRegisterDetailComponent;
  let fixture: ComponentFixture<BankRegisterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRegisterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRegisterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
