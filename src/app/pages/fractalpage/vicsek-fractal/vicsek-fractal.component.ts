import { Component, OnInit, HostListener, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'vicsek-fractal',
  template: '<div #vicsekContainer></div>',
  styleUrls: ['./vicsek-fractal.component.scss']
})
export class VicsekFractalComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('vicsekContainer') vicsekContainer!: ElementRef;
  @Input() iterations: number = 1;

  private p5Instance!: p5;

  constructor() { }

  ngOnInit() {
    if (this.iterations < 0) {
      this.iterations = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['iterations'] && !changes['iterations'].firstChange) {
      this.iterations = changes['iterations'].currentValue;
      this.redrawFractal();
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

  private createCanvas() {
    const container = this.vicsekContainer.nativeElement;
    this.p5Instance = new p5(this.sketch, container);
  }

  private redrawFractal() {
    this.p5Instance.redraw();
  }

  private sketch = (p: p5) => {
    p.setup = () => {
      const container = this.vicsekContainer.nativeElement;
      p.createCanvas(container.offsetWidth, container.offsetWidth);
      p.noLoop();
    };

    p.draw = () => {
      p.background(255);
      let length = p.width;
      let startX = 0;
      let startY = 0;
      vicsek(startX, startY, length, this.iterations);
    };

    const vicsek = (x: number, y: number, len: number, depth: number) => {
      if (depth === 0) {
        p.rect(x, y, len, len);
      } else {
        let newLen = len / 3;
        vicsek(x, y, newLen, depth - 1);
        vicsek(x + newLen * 2, y, newLen, depth - 1);
        vicsek(x, y + newLen * 2, newLen, depth - 1);
        vicsek(x + newLen, y + newLen, newLen, depth - 1);
        vicsek(x + newLen * 2, y + newLen * 2, newLen, depth - 1);
      }
    }
  }

  @HostListener('window:resize')
  private handleResize() {
    if (this.p5Instance) {
      const container = this.vicsekContainer.nativeElement;
      this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetWidth);
    }
  }
}
