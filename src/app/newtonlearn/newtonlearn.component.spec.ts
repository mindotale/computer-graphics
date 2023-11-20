import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtonlearnComponent } from './newtonlearn.component';

describe('NewtonlearnComponent', () => {
  let component: NewtonlearnComponent;
  let fixture: ComponentFixture<NewtonlearnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewtonlearnComponent]
    });
    fixture = TestBed.createComponent(NewtonlearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
