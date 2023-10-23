import { Component } from '@angular/core';

@Component({
  selector: 'app-fractalpage',
  templateUrl: './fractalpage.component.html',
  styleUrls: ['./fractalpage.component.scss']
})

export class FractalpageComponent {
  iteration: number = 4;

  drawFractal(iterationValue: string): void {
    // Parse the input value as an integer
    this.iteration = parseInt(iterationValue, 10);

    // Check if parsing was successful and it's a valid integer
    if (!isNaN( this.iteration)) {
      // Use the 'iteration' variable as an integer
      console.log('Integer Value:',  this.iteration);

      // You can perform further actions with 'iteration'
      // For example, call a function that uses 'iteration' for drawing a fractal.
    } else {
      // Handle the case where the input is not a valid integer
      console.error('Invalid Integer Value');
    }
  }
}
