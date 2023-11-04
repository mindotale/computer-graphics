import { Component } from '@angular/core';

@Component({
  selector: 'app-colorpage',
  templateUrl: './colorpage.component.html',
  styleUrls: ['./colorpage.component.scss']
})
export class ColorpageComponent {
  origImageUrl: string | ArrayBuffer | null = null;
  convImageUrl: string | ArrayBuffer | null = null;
  sliderValue: number = 50; // Initialize with a default value

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.sliderValue = parseInt(target.value, 10);
    console.log('Slider value changed:', this.sliderValue);
    // You can perform any actions based on the slider value here
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.origImageUrl = reader.result;
        this.convImageUrl = reader.result;

      };
    }
    const image = document.getElementById('loadedImage');

    if(image == null)
      return;

    const imageContainer = document.querySelector('.image-container');
    image.style.width = imageContainer?.clientWidth + 'px';
    image.style.height = imageContainer?.clientHeight + 'px';


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

  // Function to trigger file input click when the button is clicked
  selectImage() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }
}
