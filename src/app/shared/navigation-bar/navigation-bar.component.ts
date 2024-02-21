import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime} from 'rxjs';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  isMenuCollapsed = true;
  innerWidth = window.innerWidth;
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private router: Router, private imagesService: ImageService) {
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((result) => {
      if (!this.imagesService.inProgress) {
        this.navigateToSearch();
      }
    })
    window.addEventListener('resize', () => this.innerWidth = window.innerWidth)


  }

  ngOnInit() {

    if (window.location.href.includes('search')) {
      const urlValues = window.location.href.split('/');
      const index = urlValues.findIndex(u => u === 'search');
      console.log(urlValues[index + 1])
      this.searchForm.controls.search.patchValue(urlValues[index + 1]);
    }
  }

  async navigateToSearch() {
    if (!this.imagesService.inProgress) {
      await this.imagesService.getGalleryImages(this.searchForm.controls.search.value!);
    }
  }
}
