import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/interfaces/photos.interface';
import { ApiService } from 'src/app/services/api.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Observable, catchError, of } from 'rxjs';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos!: Photo[];
  constructor(private apiService: PhotoService) {}
  parseNumber!: number;
  resolvedPhotos: Photo[] = [];
  photos$: Observable<Photo[]> | null = null;
  ngOnInit(): void {
    const currentUrl = window.location.href;
    const matches = currentUrl.match(/\d+$/);
    if (matches) {
      this.parseNumber = parseInt(matches[0], 10);
    }
    this.photos$ = this.apiService.getPhotos(this.parseNumber);
    this.photos$.subscribe(
      (photos) => {
        this.resolvedPhotos = photos;
      },
      (error) => {
        console.error('Error fetching photos:', error);
      }
    );
    // this.apiService.getPhotos(this.parseNumber).subscribe((photos) => {
    //   this.photos = photos;
    // });
  }
}
