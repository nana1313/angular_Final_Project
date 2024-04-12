import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comments } from 'src/app/interfaces/comments.interface';
import { ApiService } from 'src/app/services/api.service';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Body } from '../../../interfaces/body.interface';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: Comments[];
  addCommentForm: FormGroup;
  postId!: string;
  bodyData!: Body[];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
    this.addCommentForm = this.fb.group({
      userName: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }
  onSubmit(formValue: any) {
    // this.comments = [
    //   {
    //     id: this.comments.length + 1,
    //     name: formValue.userName,
    //     body: '',
    //   },
    //   ...this.comments,
    // ];
  }
  saveToLocalStorage(newComment: any) {
    let comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.unshift(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));
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
        // this.comments = [newPost, …this.comments]
        this.comments.push(newComment);

        this.addCommentForm.reset();
      },
      (error) => {
        console.error('Error adding new user and post:', error);
      }
    );
  }
  // }

  //   const newComment = {
  //     // userId: this.users.length + 1,
  //     userName: name.trim(),
  //     body: commentBody.trim(),
  //     // id: this.bodyText.length + 1,
  //   };
  // }

  //   this.apiService.addNewComment(newPost).subscribe(
  //     (response) => {
  //       console.log('New user and post added successfully:', response);
  //       this.saveToLocalStorage(newComment);
  //       // this.comments = [newPost, …this.comments]
  //       this.bodyText.push(newComment);

  //       this.addPostForm.reset();
  //     },
  //     (error) => {
  //       console.error('Error adding new user and post:', error);
  //     }
  //   );
  // }

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
      // You can now use this.postId to fetch the specific post data

      console.log(
        'Data => ',
        this.bodyData?.find((Data) => +Data.id == +this.postId)
      );
      console.log('BodyDATA', this.bodyData);
      console.log('Post ID:', this.postId);
    });
  }
}
