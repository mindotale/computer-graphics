import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViesceklearnComponent } from './viesceklearn.component';

describe('ViesceklearnComponent', () => {
  let component: ViesceklearnComponent;
  let fixture: ComponentFixture<ViesceklearnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViesceklearnComponent]
    });
    fixture = TestBed.createComponent(ViesceklearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
