import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRegisterAddComponent } from './bank-register-add.component';

describe('BankRegisterAddComponent', () => {
  let component: BankRegisterAddComponent;
  let fixture: ComponentFixture<BankRegisterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRegisterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRegisterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
