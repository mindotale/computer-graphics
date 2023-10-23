import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtonFractalComponent } from './newton-fractal.component';

describe('NewtonFractalComponent', () => {
  let component: NewtonFractalComponent;
  let fixture: ComponentFixture<NewtonFractalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewtonFractalComponent]
    });
    fixture = TestBed.createComponent(NewtonFractalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
