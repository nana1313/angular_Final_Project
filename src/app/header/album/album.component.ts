import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.interface';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../interfaces/user.interface';
import { Photo } from 'src/app/interfaces/photos.interface';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  Albums!: Album[];
  users!: User[];
  photos!: Photo[];
  getUserName(userId: number): String {
    const user = this.users?.find((user) => user.id === userId);
    return user ? user.name : '';
  }

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
