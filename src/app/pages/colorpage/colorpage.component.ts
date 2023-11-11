import { Component, ElementRef, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'app-colorpage',
  templateUrl: './colorpage.component.html',
  styleUrls: ['./colorpage.component.scss']
})
export class ColorpageComponent {
  origImageUrl: string = "";
  convImageUrl: string = "";
  sliderValue: number = 50; // Initialize with a default value
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;


  openFileExplorer() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.loadImageAndDraw(selectedFile);
    }
  }

  loadImageAndDraw(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => this.drawOnCanvas(img);
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  drawOnCanvas(image: HTMLImageElement) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx?.drawImage(image, 0, 0);
  }


 

  saveImage() {
    if (this.convImageUrl) {
      const a = document.createElement('a');
      a.href = this.convImageUrl as string;
      a.download = 'image.png'; // Set the desired file name

      // Trigger a click event on the anchor element to start the download
      a.click();
    }
  }

  onChangeSaturationAndValue() {
  
  }

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.sliderValue = parseInt(target.value, 10);
    console.log('Slider value changed:', this.sliderValue);
    const ctx = this.canvas.nativeElement.getContext('2d');

    const imageData = ctx?.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    if(imageData == undefined)
    {
      console.log("tilt");
      return;
    }
    const data = imageData.data;
    
    // Adjust the saturation and value of yellow pixels
    for (let i = 0; i < data.length; i += 4) {
      
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const hslValues = chroma(r, g, b).hsl();
      //console.log("r = ",r," g = ", g, " b = ", b);
      
      // Check if the pixel is yellow (you may need to adjust these thresholds)
      if (hslValues[0] > 30 && hslValues[0] < 90) {
       // const hslValues = chroma(r, g, b).hsl();
        //console.log(hslValues)
        hslValues[1] = this.sliderValue/100;
        hslValues[2] = this.sliderValue/100;

        const rgbValues = chroma(hslValues[0], hslValues[1], hslValues[2], 'hsl').rgb();



        // console.log('yellow pixel here!')
        // const hexColor = chroma.rgb(r, g, b).hex();
        // console.log('dsffdsdfssfdsfd!')
        // // Adjust saturation and value
        // const modifiedColor = chroma(hexColor).saturate(100).luminance(1.1);
        // console.log("r = ",r," g = ", g, " b = ", b);
        // // Update the pixel
        // const rgbValues = chroma(modifiedColor).rgb();
        // console.log("r = ",rgbValues[0]," g = ", rgbValues[1], " b = ", rgbValues[2]);
        // data[i] = rgbValues[0];
        // data[i + 1] = rgbValues[1];
        // data[i + 2] = rgbValues[2];

         data[i] = rgbValues[0]; 
         data[i+1] = rgbValues[1]; 
         data[i+2] = rgbValues[2]; 
      }
    }

    // Put the modified data back to the canvas
    ctx?.putImageData(imageData, 0, 0);
  }


}
