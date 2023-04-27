import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ImageModalComponent } from '../shared/image-modal/image-modal.component';
import { ImageService } from '../shared/services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  galleryTitle: string | null = null;
  galleryTitleLowerCase: string = '';
  pageTitle: string | null = null;
  galleryPages: any[] = [];
  images: any[] = [];
  pages: string[] = [];


  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private sanitizer: DomSanitizer, private router: Router,
    private modalService: NgbModal, public imagesService: ImageService) {

  }

  ngOnInit() {
    this.galleryPages = [];
    this.imagesService.images = [];
    const reader = new FileReader();


    const titles = this.router.url.split('/');
    const title = titles[titles.length - 1].toLowerCase();

    this.getGalleryPages(title);

    if (this.galleryPages.length === 0) {
      this.getGalleryImages(title);
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

  private getGalleryPages(title: string) {
    this.http.get(`${environment.apiUrl}items/galleryPages?limit=-1`).subscribe((pages: any) => {
      const stringToCompare = title.split('%20').join(' ');
      this.galleryPages = pages.data.filter((l: any) => l.parentPage.toLowerCase() === stringToCompare);
    })
  }

  private getGalleryImages(title: string) {
    this.http.get(`${environment.apiUrl}items/galleryPages?limit=-1`).subscribe((pages: any) => {
      const stringToCompare = title.split('%20').join(' ');
      const id = pages.data.find((l: any) => l.title.toLowerCase() === stringToCompare)?.id;
      this.http.get(`${environment.apiUrl}items/photos?filter[galleryPage][id][_eq]=${id}`).subscribe((images: any) => {
        images.data.forEach((i: any) => {
          this.http.get(`${environment.apiUrl}assets/${i.photo}?quality=50`, { responseType: 'blob' }).subscribe(async (file) => {
            this.imagesService.images.push({
              title: i.photoName,
              image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file))
            })
          })
        })
      })
    })
  }
}
