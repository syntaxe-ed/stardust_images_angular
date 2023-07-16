import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  @Input() image: any;
  @Output() addToCartEvent = new EventEmitter<any>();
  materials: any = [];
  sizes: any = [];
  prices: any = [];
  environment = environment;
  snipcartUrl = `${environment.apiUrl}snipcart`;

  optionsForm = new FormGroup({
    size: new FormControl(null, [Validators.required]),
    material: new FormControl(null, [Validators.required])
  })

  constructor(private http: HttpClient) {
    this.getPrices();
  }

  getPrices() {
    forkJoin([
      this.http.get<{data: any[]}>(`${environment.apiUrl}items/materials?limit=-1`), 
      this.http.get<{data: any[]}>(`${environment.apiUrl}items/sizes?limit=-1`), 
      this.http.get<{data: any[]}>(`${environment.apiUrl}items/prices?limit=-1`)
    ]).subscribe(([materials, sizes, prices]) => {
      this.materials = materials.data;
      this.sizes = sizes.data;
      this.prices = prices.data;
    })
  }

  onAdd() {
    this.addToCartEvent.emit();
  }

  capitaliseFirstLetter(str: string) {
   const splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
  }

  getSizes() {
    const sizes = this.prices.filter((p: any) => +p.material === +this.optionsForm.controls.material.value!).map((p: any) => p.size);
    return this.sizes.filter((s: any) => sizes.includes(s.id));
  }

  getPrice(size: number) {
    return this.prices.filter((p: any) => +p.size === +size && +p.material === +this.optionsForm.controls.material.value!)[0]?.price;
  }

  getImageTitle(image: any) {
    if (!this.optionsForm.controls.material.value) {
      return '';
    }
    return image.title + ' ' + this.capitaliseFirstLetter(this.materials.filter((m: any) => +m.id === +this.optionsForm.controls.material.value!)[0].material);
  }

  getSizesForSnipcart() {
    const sizes = this.getSizes();
    const sizeArray = [];
    for (const size of sizes) {
        sizeArray.push(`${size.size}[+${this.getPrice(size.id)}]`)
    }
    return sizeArray.join('|');
  }

  getCurrentSize() {
    return this.sizes.filter((s: any) => +s.id === +this.optionsForm.controls.size.value!)[0]?.size;
  }

  getCurrentPrice() {
    return this.prices.filter((p: any) => +p.size === +this.optionsForm.controls.size.value! && +p.material === +this.optionsForm.controls.material.value!)[0]
  }
}
