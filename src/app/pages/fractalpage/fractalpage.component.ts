import { Component } from '@angular/core';

@Component({
  selector: 'app-fractalpage',
  templateUrl: './fractalpage.component.html',
  styleUrls: ['./fractalpage.component.scss']
})

export class FractalpageComponent {
  iteration: number = 4;

  scale: number = 1;
  c: number = 1;

  drawFractal(iterationValue: string): void {
    this.iteration = parseInt(iterationValue, 10);
    if (!isNaN( this.iteration)) {
    } else {
      console.error('Invalid Integer Value');
    }
  }

  drawNewton(scaleValue: string, cValue: string): void {
    this.scale = parseInt(scaleValue, 10);
    this.c = parseInt(cValue, 10);

    console.log("scale=", this.scale);
    console.log("c=", this.c);

    if (!isNaN( this.scale)) {
    } else {
      console.error('Invalid Scale Value');
    }

    this.c = parseInt(cValue, 10);
    if (!isNaN( this.c)) {
    } else {
      console.error('Invalid C Value');
    }
  }
}
