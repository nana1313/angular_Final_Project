import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/interfaces/comments.interface';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments!: Comments[];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getComments().subscribe((Comments) => {
      this.comments = Comments;
    });
  }
}
