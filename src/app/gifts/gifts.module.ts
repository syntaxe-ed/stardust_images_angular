import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftsComponent } from './gifts.component';
import { GiftsRoutingModule } from './gifts-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GiftsComponent
  ],
  imports: [
    CommonModule,
    GiftsRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class GiftsModule { }
