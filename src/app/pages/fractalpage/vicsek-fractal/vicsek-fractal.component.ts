import { Component, OnInit, HostListener, Input } from '@angular/core';import * as p5 from 'p5';

@Component({
  selector: 'vicsek-fractal',
  template: '',
  styleUrls: ['./vicsek-fractal.component.scss']
})
export class VicsekFractalComponent implements OnInit {
  private p5!: p5;
  @Input() iterations: number = 0; 
  
  constructor() {  }

  ngOnInit() {  }

  ngAfterViewInit() {
    this.createCanvas();
    this.handleResize();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.noLoop();
    };

    p.draw = () => {
      p.background(255);
      let length = p.width;
      let startX = 0;
      let startY = 0;
      this.vicsek(startX, startY, length, this.iterations); // Use this.iterations
    };
  };

  private vicsek(x: number, y: number, len: number, depth: number) {
    if (depth === 0) {
      this.p5.rect(x, y, len, len);
    } else {
      let newLen = len / 3;
      this.vicsek(x, y, newLen, depth - 1);
      this.vicsek(x + newLen * 2, y, newLen, depth - 1);
      this.vicsek(x, y + newLen * 2, newLen, depth - 1);
      this.vicsek(x + newLen, y + newLen, newLen, depth - 1);
      this.vicsek(x + newLen * 2, y + newLen * 2, newLen, depth - 1);
    }
  }

  private handleResize() {
    window.addEventListener('resize', () => {
      this.p5.resizeCanvas(window.innerWidth, window.innerHeight);
    });
  }
}
