import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
import { ApiService } from 'src/app/services/api.service';
import { AlbumServiceService } from 'src/app/services/album-service.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/photos.interface';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private albumService: AlbumServiceService,
    private photoService: PhotoService,
    private router: Router
  ) {}
  Albums!: Album[];
  users!: User[];
  photos!: Photo[];
  photosCountMap: { [key: number]: number } = {};
  getUserName(userId: number): String {
    const user = this.users?.find((user) => user.id === userId);
    return user ? user.name : '';
  }
  goToPhoto(albumId: Number): void {
    this.router.navigate(['/album', albumId]);
  }

  getPhotoNum(userId: Number): Number {
    return this.photos?.filter((photo) => {
      return photo.albumId === userId;
    }).length;
  }

  ngOnInit(): void {
    this.albumService.getAlbum().subscribe((Albums) => {
      this.Albums = Albums;
      this.loadPhotosCount();
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  loadPhotosCount(): void {
    this.Albums.forEach((album) => {
      this.apiService.getPhotosCount(album.id).subscribe((photos: Photo[]) => {
        this.photosCountMap[album.id] = photos.length; // Store the number of photos for the album
      });
    });
  }
}
