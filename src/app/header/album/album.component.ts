import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { Photo } from 'src/app/interfaces/photos.interface';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router) {}
  Albums!: Album[];
  users!: User[];
  photos!: Photo[];
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
    this.apiService.getAlbum().subscribe((Albums) => {
      this.Albums = Albums;
    });
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.apiService.getPhotos().subscribe((photos) => {
      this.photos = photos;
    });
  }
}
