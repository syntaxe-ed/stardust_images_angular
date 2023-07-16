import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../shared/services/image.service';
import { ImageModalComponent } from '../shared/image-modal/image-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent {

  galleryTitle: string | null = null;
  galleryTitleLowerCase: string = '';
  pageTitle: string | null = null;
  categories: any[] = [];
  images: any[] = [];
  pages: string[] = [];
  title: string = '';


  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private sanitizer: DomSanitizer, private router: Router,
    private modalService: NgbModal, public imagesService: ImageService) {
  }

  ngOnInit() {
    this.categories = [];
    this.imagesService.images = [];

    const titles = this.router.url.split('/');
    this.title = titles[titles.length - 1].toLowerCase();

    this.getProductCategories(this.title);

    if (this.title !== 'gifts') {
      this.getGalleryImages(this.title);
    }
  }

  open(index: number) {
      const modalRef = this.modalService.open(ImageModalComponent, {
        ariaLabelledBy: 'modal-basic-title', 
        windowClass: 'imageModal'
    });
      modalRef.componentInstance.imageIndex = `slide-ngb-slide-${index}`;
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

  private getProductCategories(title: string) {
    this.http.get(`${environment.apiUrl}items/productCategories?limit=-1`).subscribe((pages: any) => {
      const categories = pages.data;
      categories.forEach((p: any) => {
        this.http.get(`${environment.apiUrl}assets/${p.thumbnail}?quality=50`, { responseType: 'blob' }).subscribe(async (file) => {
          this.categories.push({
            id: p.id,
            thumbnail: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
            rawImage: await this.readBase64(file),
            title: p.title
          })
        })
      })
    })
  }

  private getGalleryImages(title: string) {
    this.http.get(`${environment.apiUrl}items/productCategories?limit=-1`).subscribe((pages: any) => {
      const stringToCompare = title.split('%20').join(' ').toLowerCase();
      if (stringToCompare === 'all') {
        this.getAllProducts();
      } else {
        this.getFilteredProducts(pages, stringToCompare);
      }
    })
  }

  private getAllProducts() {
    this.http.get(`${environment.apiUrl}items/products?limit=-1`).subscribe((products: any) => {
      products.data.forEach((i: any) => {
        this.http.get(`${environment.apiUrl}assets/${i.photo}?quality=50`, { responseType: 'blob' }).subscribe(async (file) => {
          this.imagesService.images.push({
            id: i.id,
            title: i.name,
            image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
            rawImage: await this.readBase64(file),
            price: i.price
          })
        })
      })
    })
  }

  private getFilteredProducts(pages: any, stringToCompare: string) {
    const id = pages.data.find((l: any) => l.title.toLowerCase() === stringToCompare)?.id;
    this.http.get(`${environment.apiUrl}items/products?filter[category][_eq]=${id}`).subscribe((products: any) => {
      products.data.forEach((i: any) => {
        this.http.get(`${environment.apiUrl}assets/${i.photo}?quality=50`, { responseType: 'blob' }).subscribe(async (file) => {
          this.imagesService.images.push({
            id: i.id,
            title: i.name,
            image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
            rawImage: await this.readBase64(file),
            price: i.price
          })
        })
      })
    })
  }
}
