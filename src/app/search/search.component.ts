import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../shared/image-modal/image-modal.component';
import { ImageService } from '../shared/services/image.service';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  pageTitle: string | null = null;
  pages: string[] = [];
  loading = true;


  constructor(private route: ActivatedRoute, private http: HttpClient, 
    private sanitizer: DomSanitizer,
    private modalService: NgbModal, public imagesService: ImageService, private router: Router) {

  }

  async ngOnInit() {
    this.imagesService.images = [];
    const searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    await this.getGalleryImages(searchTerm!);

    this.router.events.subscribe(async (value) => {
      // @ts-ignore
      if (value.type && value.type === 1) {
        const searchTerm = this.route.snapshot.paramMap.get('searchTerm');
        this.imagesService.images = [];
        await this.getGalleryImages(searchTerm!);
      }
    })
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


  private async getGalleryImages(searchTerm: string) {
    const stringToCompare = searchTerm.split('%20').join(' ');
    const images: any = await lastValueFrom(this.http.get(`${environment.apiUrl}items/photos?filter[keywords][_contains]=${stringToCompare}`));
    images.data.forEach(async (i: any) => {
      const file = await lastValueFrom(this.http.get(`${environment.apiUrl}assets/${i.photo}?quality=50`, { responseType: 'blob' }))
      this.imagesService.images.push({
        title: i.photoName,
        image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file))
      })
    })
  }
}
