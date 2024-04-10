import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Body } from '../interfaces/body.interface';
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

  addNewUser(newPost: {
    bodyId: Number;
    userName: String;
    title: String;
    body: String;
    userId: Number;
  }): Observable<any[]> {
    const userDataBody = {
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId,
      id: newPost.bodyId,
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

    // Combine the two observables using forkJoin
    return forkJoin([userObservable, postObservable]);
  }
}
