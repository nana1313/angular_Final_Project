import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/interfaces/photos.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos!: Photo[];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe((photos) => {
      this.photos = photos;
    });
  }
}