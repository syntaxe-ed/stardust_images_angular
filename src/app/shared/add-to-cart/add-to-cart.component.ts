import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  @Input() image: any;
  @Output() addToCartEvent = new EventEmitter<any>();
  optionsForm = new FormGroup({
    size: new FormControl('Small', [Validators.required]),
    material: new FormControl('Canvas', [Validators.required])
  })

  constructor() {}

  onAdd() {
    this.addToCartEvent.emit();
  }
}
