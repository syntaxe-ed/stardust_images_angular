import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbCollapse,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
