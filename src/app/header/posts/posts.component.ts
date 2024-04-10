import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { User } from '../../interfaces/user.interface';
import { Body } from '../../interfaces/body.interface';
// import { Title } from '../../interfaces/title.inferface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  isActive: boolean = false;
  openPostForm() {
    this.isActive = !this.isActive;
  }
  onSubmitAddingPost() {
    // console.log(this.addPostForm.value);
  }

  users!: User[];
  bodyText!: Body[];
  titleText!: Body[];

  addPostForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private LocalStore: LocalstorageService,
    private apiService: ApiService
  ) {
    this.addPostForm = this.fb.group({
      title: [''],
      body: [''],
      author: [''],
    });
  }
  onSubmit(formValue: any) {
    // Assuming formValue is an object containing the form values
    // You can access the form values using formValue.propertyName
    const title = 'title';
    const body = 'body';
    const user = 'user'; // Or any key you want
    const value = formValue; // Assuming formValue is an object containing form values

    // Store data using your local storage service
    // this.LocalStore.saveData(title, value.title);
    // this.LocalStore.saveData(body, value.body);
    // this.LocalStore.saveData(user, value.user);
    // console.log('data', this.LocalStore.getData('postauthor'));
  }
  get title() {
    return this.addPostForm.get('title');
  }
  get body() {
    return this.addPostForm.get('body');
  }
  get author() {
    return this.addPostForm.get('author');
  }
  newUser = '';
  storage = 'local-app';
  tbOnClick(userId: number, bodyId: number) {
    console.log(userId, bodyId);
  }

  // getUserName(id: number) {
  //   return this.users.find((user) => user.id === this.bodyText[].userId)?.name;
  // }
  getUserName(userId: number): String {
    const user = this.users?.find((user) => user.id === userId);
    return user ? user.name : '';
  }

  addNewPost(postUser: String, postTitle: String, postBody: String) {
    if (!postUser.trim() || !postTitle.trim() || !postBody.trim()) {
      return; // Exit the function to prevent adding the post
    }

    const newPost = {
      userId: this.users.length + 1, // Use the current timestamp as a unique ID
      userName: postUser.trim(),
      title: postTitle.trim(),
      body: postBody.trim(),
      bodyId: this.bodyText.length + 1,
    };

    // let posts = JSON.parse(localStorage.getItem('posts') || '[]');
    // posts.unshift(newPost);
    // localStorage.setItem('posts', JSON.stringify(posts));
    console.log(localStorage);
    console.log(postUser);
    this.apiService.addNewUser(newPost).subscribe(
      (response) => {
        console.log('New user and post added successfully:', response);
        // Handle the response as needed
      },
      (error) => {
        console.error('Error adding new user and post:', error);
        // Handle the error as needed
      }
    );
  }

  ngOnInit(): void {
    //  this.LocalStore.saveData('postauthor', this.addPostForm.get('author'));
    this.apiService.getUsers().subscribe((users) => {
      this.users = users;
      console.log('user', this.users);
    });

    this.apiService.getBody().subscribe((bodyText) => {
      this.bodyText = bodyText;
      console.log('body', this.bodyText);
    });
  }
}
