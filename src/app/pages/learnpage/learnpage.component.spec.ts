import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnpageComponent } from './learnpage.component';

describe('LearnpageComponent', () => {
  let component: LearnpageComponent;
  let fixture: ComponentFixture<LearnpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearnpageComponent]
    });
    fixture = TestBed.createComponent(LearnpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
