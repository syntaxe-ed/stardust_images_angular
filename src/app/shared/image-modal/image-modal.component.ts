import { Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent {
  imageIndex: string = '';
  modalRef: any;

  ngOnInit() {
  }

  constructor(public imageService: ImageService, private modalService: NgbModal) {
    
  }

  async onClick(image: any) {
    this.modalRef = this.modalService.open(AddToCartComponent, {
      ariaLabelledBy: 'modal-basic-title', 
      centered: true
    });
    this.modalRef.componentInstance.image = image;
    this.modalRef.componentInstance.addToCartEvent.subscribe(() => {
      this.modalRef.close();
    })
  }
}
