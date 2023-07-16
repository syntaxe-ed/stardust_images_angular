import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  images: any[] = [];
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.getGalleryPages();
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

  private getGalleryPages() {
    this.http.get(`${environment.apiUrl}items/landingPage?limit=-1`).subscribe((images: any) => {
      images.data.forEach((p: any) => {
        this.http.get(`${environment.apiUrl}assets/${p.image}?quality=50`, { responseType: 'blob' }).subscribe(async (file) => {
          this.images.push({
            id: p.id,
            image: this.sanitizer.bypassSecurityTrustResourceUrl(await this.readBase64(file)),
            rawImage: await this.readBase64(file),
          })
        })
      })
    })
  }
}
