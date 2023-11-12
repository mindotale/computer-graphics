import { Component, ElementRef, HostListener, Input, AfterViewInit, OnDestroy, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import * as p5 from 'p5';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'graph',
  template: '<div #graphContainer></div>',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('graphContainer') graphContainer!: ElementRef;

  @Input() p1: Point = { x: 0, y: 0 };
  @Input() p2: Point = { x: 0, y: 0 };
  @Input() p3: Point = { x: 0, y: 0 };
  @Input() a: number = 1;
  @Input() b: number = 0;

  private p5Instance!: p5;
  private container!: any;
  private p4: Point = { x: 0, y: 0 };

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.container = this.graphContainer.nativeElement;
    this.calculateFourthPoint();
    this.createCanvas();
    this.handleResize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('p1' in changes || 'p2' in changes || 'p3' in changes || 'a' in changes || 'b' in changes) {
      this.calculateFourthPoint();
      this.p5Instance.redraw();
    }
  }

  ngOnDestroy() {
    this.p5Instance.remove();
  }

  private calculateFourthPoint() {
    // Calculate the fourth point based on the properties of a parallelogram
    this.p4.x = this.p1.x + this.p3.x - this.p2.x;
    this.p4.y = this.p1.y + this.p3.y - this.p2.y;
  }

  private createCanvas() {
    this.p5Instance = new p5(this.sketch, this.container);
  }

  private sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(this.container.offsetWidth, this.container.offsetWidth);
      p.noLoop();
    };

    p.draw = () => {
      p.background(255);

      // Draw axes
      this.drawAxes(p);

      // Draw line
      this.drawLine(p);

      // Draw points
      this.drawPoints(p, this.p1, this.p2, this.p3, this.p4);

      // Draw parallelogram
      this.drawParallelogram(p, this.p1, this.p2, this.p3, this.p4);

      this.drawReflectedParallelogram(p, this.p1, this.p2, this.p3, this.p4);
    };
  };

  private drawAxes(p: p5) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Draw X-axis
    p.stroke(0);
    p.line(0, centerY, p.width, centerY);

    // Draw Y-axis
    p.line(centerX, 0, centerX, p.height);
  }

  private drawPoints(p: p5, ...points: Point[]) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    p.stroke(0, 0, 255); // Blue color for points
    p.strokeWeight(5); // Adjust the size of the points

    points.forEach(point => {
      p.point(centerX + point.x, centerY - point.y);
    });
  }

  private drawParallelogram(p: p5, ...points: Point[]) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Draw the parallelogram
    for (let i = 0; i < points.length; i++) {
      const nextIndex = (i + 1) % points.length;
      p.line(centerX + points[i].x, centerY - points[i].y, centerX + points[nextIndex].x, centerY - points[nextIndex].y);
    }
  }

  private drawReflectedParallelogram(p: p5, ...points: Point[]) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Draw the original parallelogram
    this.drawParallelogram(p, ...points);

    const l1: Point = { x: 0, y: this.b };
    const l2: Point = { x: 1, y: this.a + this.b };

    // Reflect the points around the line defined by l1 and l2
    const reflectedPoints = points.map(point => this.reflectPointAroundLine(point, l1, l2));

    // Draw the reflected parallelogram
    this.drawParallelogram(p, ...reflectedPoints);
  }

  private drawLine(p: p5) {
    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // Draw the line y = ax + b
    p.stroke(255, 0, 0); // Red color for the line
    p.strokeWeight(3); // Adjust the weight of the line

    // Define the range of x values for the line
    const startX = -p.width / 2;
    const endX = p.width / 2;

    // Draw the line segment
    p.line(centerX + startX, centerY - (this.a * startX + this.b), centerX + endX, centerY - (this.a * endX + this.b));
  }

  private reflectPointAroundLine(point: Point, lineStart: Point, lineEnd: Point): Point {
    const dx: number = lineEnd.x - lineStart.x;
    const dy: number = lineEnd.y - lineStart.y;

    const a: number = (dx ** 2 - dy ** 2) / (dx ** 2 + dy ** 2);
    const b: number = (2 * dx * dy) / (dx ** 2 + dy ** 2);

    const x2: number = a * (point.x - lineStart.x) + b * (point.y - lineStart.y) + lineStart.x;
    const y2: number = b * (point.x - lineStart.x) - a * (point.y - lineStart.y) + lineStart.y;

    return { x: x2, y: y2 };
  }

  @HostListener('window:resize')
  private handleResize() {
    if (this.p5Instance) {
      const container = this.graphContainer.nativeElement;
      this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetWidth);
    }
  }
}
