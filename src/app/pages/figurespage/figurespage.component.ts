// figurespage.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-figurespage',
  templateUrl: './figurespage.component.html',
  styleUrls: ['./figurespage.component.scss']
})
export class FigurespageComponent {
  // Initial parameters
  p1 = { x: 100, y: 100 };
  p2 = { x: 300, y: 200 };
  p3 = { x: 400, y: 400 };
  a = -0.25;
  b = 0;
}
