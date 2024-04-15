import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
import { ApiService } from 'src/app/services/api.service';
import { AlbumServiceService } from 'src/app/services/album-service.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/photos.interface';
import { PhotoService } from 'src/app/services/photo.service';
// import { Router } from '@angular/router';
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
  // goToPhotos(albumId: number) {
  //   this.router.navigate(['/photo', albumId]);
  // }
  getPhotoNum(userId: Number): Number {
    return this.photos?.filter((photo) => {
      // console.log(photo.albumId, userId);
      return photo.albumId === userId;
    }).length;
  }
  // console.log(albumId, album);
  // return album;
  // return album ? album. : 0;
  ngOnInit(): void {
    this.albumService.getAlbum().subscribe((Albums) => {
      this.Albums = Albums;
      this.loadPhotosCount();
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.photoService.getPhotos().subscribe((photos) => {
      this.photos = photos;
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
