import { Component } from '@angular/core';
import { ImageService } from './shared/services/image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stardust_images';

  constructor(private imageService: ImageService) {
    this.imageService.loading.subscribe((value) => {
      console.log('LOADING VALUE: ', value);
    })
  }
}
