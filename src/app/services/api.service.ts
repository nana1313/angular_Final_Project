import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Body } from '../interfaces/body.interface';
import { Album } from '../interfaces/album.interface';
import { Todo } from '../interfaces/todos.interface';
import { Photo } from '../interfaces/photos.interface';
import { Comments } from '../interfaces/comments.interface';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
  getBody(): Observable<Body[]> {
    return this.http.get<Body[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(
      'https://jsonplaceholder.typicode.com/albums'
    );
  }
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }
  getComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    );
  }
  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(
      'https://jsonplaceholder.typicode.com/albums/1/photos'
    );
  }

  addNewUser(newPost: {
    id: Number;
    userName: String;
    title: String;
    body: String;
    userId: Number;
  }): Observable<any[]> {
    const userDataBody = {
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId,
      id: newPost.id,
    };
    const userData = {
      name: newPost.userName,
      id: newPost.userId,
    };

    // this.http.post('https://jsonplaceholder.typicode.com/posts', userDataBody);
    // this.http.post('https://jsonplaceholder.typicode.com/users', userData);
    const userObservable = this.http.post(
      'https://jsonplaceholder.typicode.com/users',
      userData
    );
    const postObservable = this.http.post(
      'https://jsonplaceholder.typicode.com/posts',
      userDataBody
    );

    return forkJoin([userObservable, postObservable]);
  }
}
