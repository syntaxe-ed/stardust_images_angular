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
  loading = true;

  constructor(private modalService: NgbModal, public imagesService: ImageService,
    private route: ActivatedRoute) {
      this.imagesService.loading.subscribe((value) => {
        console.log('loading value: ', this.loading)
        this.loading = value;
      })
  }

 async ngOnInit() {
    // this.imagesService.images = [];
    // const searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    // await this.imagesService.getGalleryImages(searchTerm!);
    // this.loading = false;
    // const searchTerm = this.route.snapshot.paramMap.get('searchTerm');
    // await this.imagesService.getGalleryImages(searchTerm!);

  }

  ngOnChanges() {

  }

  async ngAfterViewInit() {

  }


  open(index: number) {
      const modalRef = this.modalService.open(ImageModalComponent, {
        ariaLabelledBy: 'modal-basic-title', 
        windowClass: 'imageModal',
        centered: true
    });
      modalRef.componentInstance.imageIndex = `slide-ngb-slide-${index}`;
  }





}
