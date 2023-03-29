import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftsComponent } from './gifts.component';
import { GiftsRoutingModule } from './gifts-routing.module';



@NgModule({
  declarations: [
    GiftsComponent
  ],
  imports: [
    CommonModule,
    GiftsRoutingModule
  ]
})
export class GiftsModule { }
