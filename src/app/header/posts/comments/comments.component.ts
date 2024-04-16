import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comments } from 'src/app/interfaces/comments.interface';
import { ApiService } from 'src/app/services/api.service';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Body } from '../../../interfaces/body.interface';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: Comments[];
  addCommentForm: FormGroup;
  bodyData!: Body[];
  postTitle: String = '';
  postBody: String = '';
  parseNumber!: number;
  postId!: number;
  editedTitle: String = '';
  editedBody: String = '';
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.addCommentForm = this.fb.group({
      userName: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }
  onSubmit(formValue: any) {
  
  }
  saveToLocalStorage(newComment: any) {
    let comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.unshift(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.editedTitle = this.postTitle;
    this.editedBody = this.postBody;
  }
  addNewComment(name: String, commentBody: String) {
    if (!name.trim() || !commentBody.trim()) {
      return;
    }
    const newComment = {
      name: name.trim(),
      body: commentBody.trim(),
      postId: this.comments.length + 1,
      id: Date.now(),
    };
    this.apiService.addNewComment(newComment).subscribe(
      (response) => {
        console.log('New user and post added successfully:', response);
        this.saveToLocalStorage(newComment);
       
        this.comments.push(newComment);

        this.addCommentForm.reset();
      },
      (error) => {
        console.error('Error adding new user and post:', error);
      }
    );
  }
 

  ngOnInit(): void {
    this.apiService.getComments().subscribe((Comments) => {
      this.comments = Comments;
    });
    this.apiService.getBody().subscribe((bodyData) => {
      this.bodyData = bodyData;
    });
    console.log(this.bodyData);
    this.route.params.subscribe((params) => {
      this.postId = params['postId'];
     

      console.log(
        'Data => ',
        this.bodyData?.find((Data: any) => Data.id === +this.postId)
      );
      console.log('BodyDATA', this.bodyData);
      console.log('Post ID:', this.postId);
    });
    const currentUrl = window.location.href;
    const matches = currentUrl.match(/\d+$/);
    if (matches) {
      this.parseNumber = parseInt(matches[0], 10);
      this.postId = this.parseNumber;
      this.loadPostTitleAndBody();
    }
  }
  loadPostTitleAndBody(): void {
    this.http
      .get<Body>(
        `https://jsonplaceholder.typicode.com/posts/${this.parseNumber}`
      )
      .subscribe(
        (post) => {
          this.postTitle = post.title;
          this.postBody = post.body;
        },
        (error) => {
          console.error('Error loading post:', error);
        }
      );
  }
}
