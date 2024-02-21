import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  images: any[] = [];
  loading = new EventEmitter();
  inProgress = false;

  constructor( private http: HttpClient, 
    private sanitizer: DomSanitizer,
    private router: Router) { }

  public async getGalleryImages(searchTerm: string) {
    if (!this.inProgress) {
      this.inProgress = true;
      await this.router.navigate(['search', searchTerm!]);
      this.loading.emit(true);
      this.images = [];
      const stringToCompare = searchTerm.split('%20').join(' ');
      const images: any = await lastValueFrom(this.http.get(`${environment.apiUrl}items/photos?filter[keywords][_contains]=${stringToCompare}`));
      for (const i of images.data) {
        const file = await lastValueFrom(this.http.get(`${environment.apiUrl}assets/${i.photo}?quality=50`, { responseType: 'blob' }))
        this.images.push({
          title: i.photoName,
          image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file))
        })
      }
      setTimeout(() => {
        this.loading.emit(false);
        this.inProgress = false;
      }, 1000) //Artificial delay to stop repeated execution
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
