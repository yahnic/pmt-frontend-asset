import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffenceComponent } from './offence.component';

describe('OffenceComponent', () => {
  let component: OffenceComponent;
  let fixture: ComponentFixture<OffenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
