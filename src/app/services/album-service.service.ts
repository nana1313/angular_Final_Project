import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../interfaces/album.interface';
@Injectable({
  providedIn: 'root',
})
export class AlbumServiceService {
  constructor(private http: HttpClient) {}
  getAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }
}
