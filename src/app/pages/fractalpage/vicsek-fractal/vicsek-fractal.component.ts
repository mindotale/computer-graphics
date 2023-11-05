import { Component, OnInit, HostListener, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'vicsek-fractal',
  template: '<div #vicsekContainer></div>',
  styleUrls: ['./vicsek-fractal.component.scss']
})
export class VicsekFractalComponent implements OnInit, AfterViewInit, OnDestroy {
  private p5Instance!: p5;
  @Input() iterations: number = 0;
  @ViewChild('vicsekContainer') vicsekContainer!: ElementRef;

  constructor() { }

  ngOnInit() {
    // Validate the input for iterations
    if (this.iterations < 0) {
      this.iterations = 0;
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
    this.p5Instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(container.offsetWidth, container.offsetHeight);
        p.noLoop();
      };

      p.draw = () => {
        p.background(255);
        let length = p.width;
        let startX = 0;
        let startY = 0;
        this.vicsek(startX, startY, length, this.iterations, p);
      };
    }, container);
  }

  private vicsek(x: number, y: number, len: number, depth: number, p: p5) {
    if (depth === 0) {
      p.rect(x, y, len, len);
    } else {
      let newLen = len / 3;
      this.vicsek(x, y, newLen, depth - 1, p);
      this.vicsek(x + newLen * 2, y, newLen, depth - 1, p);
      this.vicsek(x, y + newLen * 2, newLen, depth - 1, p);
      this.vicsek(x + newLen, y + newLen, newLen, depth - 1, p);
      this.vicsek(x + newLen * 2, y + newLen * 2, newLen, depth - 1, p);
    }
  }

  @HostListener('window:resize')
  private handleResize() {
    if (this.p5Instance) {
      const container = this.vicsekContainer.nativeElement;
      this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetHeight);
    }
  }
}
