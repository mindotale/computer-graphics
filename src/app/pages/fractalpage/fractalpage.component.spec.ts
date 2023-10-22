import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalpageComponent } from './fractalpage.component';

describe('FractalpageComponent', () => {
  let component: FractalpageComponent;
  let fixture: ComponentFixture<FractalpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FractalpageComponent]
    });
    fixture = TestBed.createComponent(FractalpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
