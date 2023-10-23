import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VicsekFractalComponent } from './vicsek-fractal.component';

describe('VicsekFractalComponent', () => {
  let component: VicsekFractalComponent;
  let fixture: ComponentFixture<VicsekFractalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VicsekFractalComponent]
    });
    fixture = TestBed.createComponent(VicsekFractalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
