import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpageComponent } from './colorpage.component';

describe('ColorpageComponent', () => {
  let component: ColorpageComponent;
  let fixture: ComponentFixture<ColorpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorpageComponent]
    });
    fixture = TestBed.createComponent(ColorpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
