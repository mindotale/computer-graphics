import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'newton-fractal',
  template: '<div #newtonContainer></div>',
  styleUrls: ['./newton-fractal.component.scss']
})
export class NewtonFractalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('newtonContainer') newtonContainer!: ElementRef;
  @Input() scale: number = 1;
  @Input() constant: number = 1;

  private p5Instance!: p5;
  private tolerance = 0.001;
  private zeroTolerance = 0.000001;
  private maxIterations = 100;
  private centerX = 0.0;
  private centerY = 0.0;

  constructor() {};

  ngOnInit() { 
    if(this.scale < 0) {
      this.scale = 0;
    }
  }

  ngAfterViewInit() {
    this.createCanvas();
    this.handleResize();
  }

  ngOnDestroy() {
    if (this.p5Instance) {
      this.p5Instance.remove();
    }
  }

  private createCanvas = () => {
    const container = this.newtonContainer.nativeElement;
    this.p5Instance = new p5(this.sketch, container);
  }

  private sketch = (p: p5) => {
    const colors = [
      p.color(0, 0, 0),    
      p.color(255, 0, 0),  
      p.color(0, 255, 0),  
      p.color(0, 0, 255),  
      p.color(255, 255, 0),
    ];
    
    p.setup = () => {
      const container = this.newtonContainer.nativeElement;
      p.createCanvas(container.offsetWidth, container.offsetWidth);
      p.noLoop();
    };

    p.draw = () => {
      p.background(255);

      const halfWidth = p.width / 2;
      const halfHeight = p.height / 2;
      p.loadPixels();

      for (let y = 0; y < p.height; y++) {
        for (let x = 0; x < p.width; x++) {
          const real = (x - halfWidth) / (halfWidth * this.scale) + this.centerX;
          const imag = (y - halfHeight) / (halfHeight * this.scale) + this.centerY;
          const color = getColor(real, imag);
          p.set(x, y, color);
        }
      }
      p.updatePixels();
    };

    const newton = (x: number, y: number) => {
      const bigCoeff = 1 / (4 * (x * x + y * y) * (x * x + y * y));
      return [
        0.75 * x + bigCoeff * (x * x * x - 6 * x * y * y),
        0.75 * y - bigCoeff * (6 * x * x * y - y * y * y),
      ];
    }

    const getColor = (x: number, y: number) => {
      let iterations = 0;
      while (iterations < this.maxIterations) {
        if (x * x + y * y < this.zeroTolerance) {
          return colors[0]; 
        } else if ((x - this.constant) * (x - this.constant) + y * y < this.tolerance) {
          return colors[1]; 
        } else if (x * x + (y - this.constant) * (y - this.constant) < this.tolerance) {
          return colors[2]; 
        } else if ((x + this.constant) * (x + this.constant) + y * y < this.tolerance) {
          return colors[3]; 
        } else if (x * x + (y + this.constant) * (y + this.constant) < this.tolerance) {
          return colors[4]; 
        } else {
          [x, y] = newton(x, y);
          iterations++;
        }
      }
      return colors[0];
    }
  }

  @HostListener('window:resize')
  private handleResize() {
    if (this.p5Instance) {
      const container = this.newtonContainer.nativeElement;
      this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetWidth);
    }
  }
}
