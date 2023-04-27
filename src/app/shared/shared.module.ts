import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { NgbCollapse, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { ImageService } from './services/image.service';



@NgModule({
  declarations: [
    NavigationBarComponent,
    FooterComponent,
    ImageModalComponent,
  ],
  providers: [ImageService],
  imports: [
    CommonModule,
    NgbCollapse,
    RouterModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    NavigationBarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
