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
  private container!: any;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.container = this.graphContainer.nativeElement;
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
      drawAxes(p);

      // Draw line
      drawLine(p);

      // Draw points
      drawPoints(p, this.p1, this.p2, this.p3);

      // Draw parallelogram
      drawParallelogram(p, this.p1, this.p2, this.p3);

      console.log('p1:', this.p1);
      console.log('p2:', this.p2);
      console.log('p3:', this.p3);
      console.log('a:', this.a);
      console.log('b:', this.b);
    };

    const drawAxes = (p: p5) => {
      const centerX = p.width / 2;
      const centerY = p.height / 2;

      // Draw X-axis
      p.stroke(0);
      p.line(0, centerY, p.width, centerY);

      // Draw Y-axis
      p.line(centerX, 0, centerX, p.height);
    };

    const drawPoints = (p: p5, ...points: { x: number, y: number }[]) => {
      const centerX = p.width / 2;
      const centerY = p.height / 2;

      p.stroke(0, 0, 255); // Blue color for points
      p.strokeWeight(5); // Adjust the size of the points

      points.forEach(point => {
        p.point(centerX + point.x, centerY - point.y);
      });
    };

    const drawParallelogram = (p: p5, p1: { x: number, y: number }, p2: { x: number, y: number }, p3: { x: number, y: number }) => {
      const centerX = p.width / 2;
      const centerY = p.height / 2;

      // Draw the parallelogram
      const p4 = calculateFourthPoint(p1, p2, p3);
      p.line(centerX + p1.x, centerY - p1.y, centerX + p2.x, centerY - p2.y);
      p.line(centerX + p2.x, centerY - p2.y, centerX + p3.x, centerY - p3.y);
      p.line(centerX + p3.x, centerY - p3.y, centerX + p4.x, centerY - p4.y);
      p.line(centerX + p4.x, centerY - p4.y, centerX + p1.x, centerY - p1.y);
    };

    const drawLine = (p: p5) => {
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
    };

    const calculateFourthPoint = (p1: { x: number, y: number }, p2: { x: number, y: number }, p3: { x: number, y: number }) => {
      // Calculate the fourth point based on the properties of a parallelogram
      const p4x = p1.x + p3.x - p2.x;
      const p4y = p1.y + p3.y - p2.y;
      return { x: p4x, y: p4y };
    };
  };

  @HostListener('window:resize')
    private handleResize() {
      if (this.p5Instance) {
        const container = this.graphContainer.nativeElement;
        this.p5Instance.resizeCanvas(container.offsetWidth, container.offsetWidth);
      }
    };

   
}
