import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'newton-fractal',
  templateUrl: './newton-fractal.component.html',
  styleUrls: ['./newton-fractal.component.scss']
})
export class NewtonFractalComponent implements OnInit, AfterViewInit {
  private p5!: p5;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.createCanvas();
    this.handleResize();
  }

  private createCanvas() {
    this.p5 = new p5(this.sketch);
  }

  private sketch(p: p5) {
    const colors = [
      p.color(0, 0, 0),    
      p.color(255, 0, 0),  
      p.color(0, 255, 0),  
      p.color(0, 0, 255),  
      p.color(255, 255, 0),
    ];

    const tolerance: number = 0.001;
    const zeroTolerance = 0.000001;
    const maxIterations = 100;
    let zoom = 1.0;
    let centerX = 0.0;
    let centerY = 0.0;

    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.noLoop();
    };

    p.draw = () => {
      p.background(0);

      const halfWidth = p.width / 2;
      const halfHeight = p.height / 2;
      p.loadPixels();

      for (let y = 0; y < p.height; y++) {
        for (let x = 0; x < p.width; x++) {
          const real = (x - halfWidth) / (halfWidth * zoom) + centerX;
          const imag = (y - halfHeight) / (halfHeight * zoom) + centerY;
          const color = getColor(real, imag);
          p.set(x, y, color);
        }
      }
      p.updatePixels();
    };

    function newton(x: number, y: number) {
      const bigCoeff = 1.0 / (4 * (x * x + y * y) * (x * x + y * y));
      return [
        0.75 * x + bigCoeff * (x * x * x - 6 * x * y * y),
        0.75 * y - bigCoeff * (6 * x * x * y - y * y * y),
      ];
    }

    function getColor(x: number, y: number) {
      let iterations = 0;
      while (iterations < maxIterations) {
        if (x * x + y * y < zeroTolerance) {
          return colors[0]; 
        } else if ((x - 1) * (x - 1) + y * y < tolerance) {
          return colors[1]; 
        } else if (x * x + (y - 1) * (y - 1) < tolerance) {
          return colors[2]; 
        } else if ((x + 1) * (x + 1) + y * y < tolerance) {
          return colors[3]; 
        } else if (x * x + (y + 1) * (y + 1) < tolerance) {
          return colors[4]; 
        } else {
          [x, y] = newton(x, y);
          iterations++;
        }
      }
      return colors[0];
    }
  }

  private handleResize() {
    window.addEventListener('resize', () => {
      this.p5.resizeCanvas(window.innerWidth, window.innerHeight);
    });
  }
}
