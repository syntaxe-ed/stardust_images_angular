import { Component, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  imageIndex: string = '';

  ngOnInit() {
    console.log(this.imageIndex);
  }

  constructor(public imageService: ImageService) {
    
  }
}
