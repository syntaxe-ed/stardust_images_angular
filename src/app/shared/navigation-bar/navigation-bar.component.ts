import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime} from 'rxjs';

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

  constructor(private router: Router) {
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((result) => {
      this.navigateToSearch();
    })
    window.addEventListener('resize', () => this.innerWidth = window.innerWidth)
  }

  navigateToSearch() {
    this.router.navigate(['search', this.searchForm.controls.search.value]);
  }
}
