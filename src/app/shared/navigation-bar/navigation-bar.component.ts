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
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(private router: Router) {
    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((result) => {
      this.router.navigate(['search', result.search])
    })
  }
}
