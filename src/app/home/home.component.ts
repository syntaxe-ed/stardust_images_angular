import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: any[] = [];
  imageHeight = 0;
  loading = true;
  @ViewChild('container') elementRef: ElementRef | undefined;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private changeDetector: ChangeDetectorRef) {
    this.getLandingPageImages();
    window.addEventListener('resize', (event) => this.resize(event))
  }

  getContainerHeight() {
    try {
      return this.elementRef?.nativeElement.offsetHeight;
    } catch {
      return 0;
    }
  }

  /*
    Very hacky way to reload the images on page resize, which will resize the element.

    Need to find out exactly why this is caused so can resize without refreshing content
  */
  resize(event: any) {
    this.getLandingPageImages()
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

  private async getLandingPageImages() {
  const oldImages = this.images;
  const newImages: any[] = [];
   const images: any =  await lastValueFrom(this.http.get(`${environment.apiUrl}items/landingPage?limit=-1`)).catch(() => {
    this.images = oldImages;
    this.loading = false;
   });
   images.data.forEach(async (p: any) => {
    const file = await lastValueFrom(this.http.get(`${environment.apiUrl}assets/${p.image}?quality=50`, { responseType: 'blob' })).catch(() => {
      this.images = oldImages;
      this.loading = false;
    })
    newImages.push({
      id: p.id,
      image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
      rawImage: await this.readBase64(file),
    })
    })
    this.images = newImages;
    this.loading = false;
  }
}
