import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  @Input() image: any;
  @Output() addToCartEvent = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.image);
  }

  onAdd() {
    this.addToCartEvent.emit();
  }
}
