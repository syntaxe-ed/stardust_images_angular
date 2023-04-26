import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OrderByAspectRatioPipe } from './pipes/order-by-aspect-ratio.pipe';



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    OrderByAspectRatioPipe
  ],
  imports: [
    CommonModule,
    NgbCollapse,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent,
    OrderByAspectRatioPipe
  ]
})
export class SharedModule { }
