import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurespageComponent } from './figurespage.component';

describe('FigurespageComponent', () => {
  let component: FigurespageComponent;
  let fixture: ComponentFixture<FigurespageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FigurespageComponent]
    });
    fixture = TestBed.createComponent(FigurespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
