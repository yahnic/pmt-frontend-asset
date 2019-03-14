import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRegisterEditComponent } from './bank-register-edit.component';

describe('BankRegisterEditComponent', () => {
  let component: BankRegisterEditComponent;
  let fixture: ComponentFixture<BankRegisterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRegisterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
