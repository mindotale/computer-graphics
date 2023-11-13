import { Component, ElementRef, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'app-colorpage',
  templateUrl: './colorpage.component.html',
  styleUrls: ['./colorpage.component.scss']
})
export class ColorpageComponent {
  origImageUrl: string = "";
  sliderValue: number = 50; // Initialize with a default value
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;

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
      this.origImageUrl = event.target?.result as string;
      
    };
    reader.readAsDataURL(file);
  }

  drawOnCanvas(image: HTMLImageElement) {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.addEventListener("click", function (event) {
      // Get the click coordinates relative to the canvas
      var x = event.clientX - canvas.getBoundingClientRect().left;
      var y = event.clientY - canvas.getBoundingClientRect().top;

      // Get the pixel data at the clicked coordinates
      var context = canvas.getContext("2d");
      var pixelData = ctx?.getImageData(x, y, 1, 1).data;
      if(pixelData == undefined)
      {
        console.log("tilt");
        return;
      }
      // Log the coordinates and pixel color information to the console
      console.log("Clicked at coordinates (x, y):", x, y);
      console.log("Pixel color (R, G, B, A):", pixelData[0], pixelData[1], pixelData[2], pixelData[3]);
  });
    ctx?.drawImage(image, 0, 0);
  }

  saveImage() {
    if (this.canvas.nativeElement) {
      const a = document.createElement('a');
      a.href = this.canvas.nativeElement.toDataURL() as string;
      a.download = 'image.png';

      a.click();
    }
  }

  onShowOriginal() {
    var image = new Image();
    image.src = this.origImageUrl;
    
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx?.drawImage(image, 0, 0);
  }

  onSliderChange(event: Event, xInput: string, yInput: string, widthInput: string, heightInput: string) {
    this.x = parseInt(xInput);
    this.y = parseInt(yInput);
    this.width = parseInt(widthInput);
    this.height = parseInt(heightInput);

    const target = event.target as HTMLInputElement;
    this.sliderValue = parseInt(target.value, 10);
    const ctx = this.canvas.nativeElement.getContext('2d');

    const imageData = ctx?.getImageData(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    if(imageData == undefined)
      return;

    const data = imageData.data;


    for (let i = 0; i < data.length; i += 4) {
      // Extract the pixel coordinates from the loop index
      const pixelX = (i / 4) % imageData.width;
      const pixelY = Math.floor((i / 4) / imageData.width);

      // Check if the pixel is outside the specified rectangle
      if (pixelX < this.x  || pixelX >= this.x + this.width || pixelY < this.y || pixelY >= this.y + this.height) {
        continue; // Ignore pixels outside the rectangle
      }

      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const hslValues = chroma(r, g, b).hsl();

      if (hslValues[0] > 30 && hslValues[0] < 90) {
        hslValues[1] = this.sliderValue / 100;
        hslValues[2] = this.sliderValue / 100;

        const rgbValues = chroma(hslValues[0], hslValues[1], hslValues[2], 'hsl').rgb();

        data[i] = rgbValues[0];
        data[i + 1] = rgbValues[1];
        data[i + 2] = rgbValues[2];
      }
    }

    ctx?.putImageData(imageData, 0, 0);
  }

  getPixelData(){
    
  }

}
