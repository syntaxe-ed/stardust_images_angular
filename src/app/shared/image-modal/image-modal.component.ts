import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  index: number = 0;

  constructor(public imageService: ImageService) {}
}
