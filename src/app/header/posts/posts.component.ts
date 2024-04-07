import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalstorageService } from 'src/app/localstorage.service';

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

  addPostForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private LocalStore: LocalstorageService
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
    const postAuthor = 'postauthor'; // Or any key you want
    const value = formValue; // Assuming formValue is an object containing form values

    // Store data using your local storage service
    this.LocalStore.saveData(title, value.title);
    this.LocalStore.saveData(body, value.body);
    this.LocalStore.saveData(postAuthor, value.postAuthor);
    // console.log('data', this.LocalStore.getData('postauthor'));
    console.log(value.title);
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
  storage = 'local-app';
  ngOnInit(): void {
    //  this.LocalStore.saveData('postauthor', this.addPostForm.get('author'));
  }
}
