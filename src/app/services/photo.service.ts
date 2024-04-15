import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Photo } from '../interfaces/photos.interface';
@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}
  getPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.apiUrl}/albums/${albumId}/photos`);
  }
}
