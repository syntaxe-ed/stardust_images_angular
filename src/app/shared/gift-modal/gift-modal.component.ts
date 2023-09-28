import { Component, ElementRef, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../services/image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-gift-modal',
  templateUrl: './gift-modal.component.html',
  styleUrls: ['./gift-modal.component.scss']
})
export class GiftModalComponent {
  imageIndex: number = 0;
  modalRef: any;
  images: any[] = [];
  snipcartUrl = `${environment.apiUrl}snipcart`;

  ngOnInit() {
    this.getImages();
  }

  constructor(public imageService: ImageService, private modalService: NgbModal, private http: HttpClient,
    private sanitizer: DomSanitizer) {
  
  }

  onAdd() {
    this.modalService.dismissAll();
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

  async getImages() {
    console.log(this.imageService.images);
    for (const i of this.imageService.images[+this.imageIndex].images) {
      const file = await lastValueFrom(this.http.get(`${environment.apiUrl}assets/${i}?quality=50`, { responseType: 'blob' }));
      this.images.push({
        image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
      })
    }
}

  private readBase64(file: any): Promise<any> {
    const reader = new FileReader();
    const future = new Promise((resolve, reject) => {
      reader.addEventListener('load', function () {
        resolve(reader.result);
      }, false);
      reader.addEventListener('error', function (event) {
        reject(event);
      }, false);

      reader.readAsDataURL(file);
    });
    return future;
  }
}
