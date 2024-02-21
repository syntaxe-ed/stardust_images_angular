import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ImageService } from './services/image.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ErrorComponent } from './error/error.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { GiftModalComponent } from './gift-modal/gift-modal.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    ImageModalComponent,
    AddToCartComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    GiftModalComponent
  ],

  imports: [
    CommonModule,
    NgbCollapse,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
