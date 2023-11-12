import { Component, ElementRef, HostListener, Input, AfterViewInit, OnDestroy, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'graph',
  template: '<div #graphContainer></div>',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('graphContainer') graphContainer!: ElementRef;

  @Input() p1: { x: number, y: number } = { x: 0, y: 0};
  @Input() p2: { x: number, y: number } = { x: 0, y: 0};
  @Input() p3: { x: number, y: number } = { x: 0, y: 0};
  @Input() a: number = 1;
  @Input() b: number = 0;

  private p5Instance!: p5;

  constructor() { }

  ngOnInit() {  }

  ngAfterViewInit() {
    this.createCanvas();
    this.handleResize();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.p5Instance.redraw();
  }

  ngOnDestroy() {
    this.p5Instance.remove();
  }

  private createCanvas() {
    const container = this.graphContainer.nativeElement;
    this.p5Instance = new p5(this.sketch, container);
  }

  private sketch = (p: p5) => {
    p.setup = () => {
      const container = this.graphContainer.nativeElement;
      p.createCanvas(container.offsetWidth, container.offsetWidth);
      p.noLoop();
    };

    p.draw = () => {
      console.log('p1:', this.p1);
      console.log('p2:', this.p2);
      console.log('p3:', this.p3);
      console.log('a:', this.a);
      console.log('b:', this.b);
      p.background(255);

      // Draw the original parallelogram
      p.fill(150, 150, 150);
      p.quad(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y, this.p1.x + this.p2.x - this.p3.x, this.p1.y + this.p2.y - this.p3.y);

      // Draw the line
      p.stroke(0);
      p.line(0, this.b, p.width, this.a * p.width + this.b);

      // Reflect the points
      const reflectedP1 = reflectPoint(this.p1);
      const reflectedP2 = reflectPoint(this.p2);
      const reflectedP3 = reflectPoint(this.p3);

      // Draw the reflected parallelogram
      p.fill(100, 100, 255);
      p.quad(reflectedP1.x, reflectedP1.y, reflectedP2.x, reflectedP2.y, reflectedP3.x, reflectedP3.y, reflectedP1.x + reflectedP2.x - reflectedP3.x, reflectedP1.y + reflectedP2.y - reflectedP3.y);
    };

    const reflectPoint = (point: { x: number, y: number }) => {
      const xTranslated = point.x;
      const yTranslated = point.y - this.b / this.a;

      const xReflected = xTranslated;
      const yReflected = -yTranslated;

      const xFinal = xReflected;
      const yFinal = yReflected + this.b / this.a;

      return { x: xFinal, y: yFinal };
    };
  };

  @HostListener('window:resize')
  private handleResize() {
    if (this.p5Instance) {
      const container = this.graphContainer.nativeElement;
      this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetWidth);
    }
  }
}
