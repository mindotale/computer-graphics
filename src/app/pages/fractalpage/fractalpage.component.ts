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
  colors: string[] = [
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00' 
  ];

  drawFractal(iterationValue: string): void {
    this.iteration = parseInt(iterationValue, 10);
    if (!isNaN( this.iteration)) {
    } else {
      console.error('Invalid Integer Value');
    }
  }

  drawNewton(scaleValue: string, cValue: string, color1: string, color2: string, color3: string, color4: string, color5: string): void {
    this.scale = parseFloat(scaleValue);
    this.c = parseFloat(cValue);

    let newColors = [
      '#' + color1,
      '#' + color2,
      '#' + color3,
      '#' + color4,
      '#' + color5
    ]

    this.colors = newColors;

    if (!isNaN( this.scale)) {
    } else {
      console.error('Invalid Scale Value');
    }

    if (!isNaN( this.c)) {
    } else {
      console.error('Invalid C Value');
    }
  }
}
