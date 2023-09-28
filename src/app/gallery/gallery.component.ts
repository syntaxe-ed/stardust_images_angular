import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { ImageModalComponent } from '../shared/image-modal/image-modal.component';
import { ImageService } from '../shared/services/image.service';
import { lastValueFrom } from 'rxjs';

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
  loading = true;


  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private sanitizer: DomSanitizer, private router: Router,
    private modalService: NgbModal, public imagesService: ImageService) {

  }

  async ngOnInit() {
    this.loading = true;
    this.galleryPages = [];
    this.imagesService.images = [];

    const titles = this.router.url.split('/');
    const title = titles[titles.length - 1].toLowerCase();

    await this.getGalleryPages(title);

    if (this.galleryPages.length === 0) {
      await this.getGalleryImages(title);
    }
    this.loading = false;
  }

  open(index: number) {
      const modalRef = this.modalService.open(ImageModalComponent, {
        ariaLabelledBy: 'modal-basic-title', 
        windowClass: 'imageModal',
        centered: true
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

  private async  getGalleryPages(title: string) {
    const pages: any = await lastValueFrom(this.http.get(`${environment.apiUrl}items/galleryPages?limit=-1`));
    const stringToCompare = title.split('%20').join(' ');
    const galleryPages = pages.data.filter((l: any) => l.parentPage.toLowerCase() === stringToCompare).sort((a: any, b: any) => a.id - b.id);
    galleryPages.forEach(async (p: any) => {
      const file = await lastValueFrom(this.http.get(`${environment.apiUrl}assets/${p.thumbnail}?quality=50`, { responseType: 'blob' }))
      this.galleryPages.push({
        id: p.id,
        parentPage: p.parentPage,
        password: p.password,
        thumbnail: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
        rawImage: await this.readBase64(file),
        title: p.title
      })
    })
  }

  private async getGalleryImages(title: string) {
    const pages: any = await lastValueFrom(this.http.get(`${environment.apiUrl}items/galleryPages?limit=-1`));
    const stringToCompare = title.split('%20').join(' ');
    const id = pages.data.find((l: any) => l.title.toLowerCase() === stringToCompare)?.id;
    const images: any = await lastValueFrom(this.http.get(`${environment.apiUrl}items/photos?filter[galleryPage][id][_eq]=${id}`));
    images.data.forEach(async (i: any) => {
      const file = await lastValueFrom(this.http.get(`${environment.apiUrl}assets/${i.photo}?quality=50`, { responseType: 'blob' }))
      this.imagesService.images.push({
        title: i.photoName,
        image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
        rawImage: await this.readBase64(file)
      })
    })
  }
}
