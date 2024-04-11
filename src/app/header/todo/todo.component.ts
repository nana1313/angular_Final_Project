import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todos.interface';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos!: Todo[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
}
