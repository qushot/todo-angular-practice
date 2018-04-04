import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = [];

  constructor(
    // アクセス修飾子忘れるとDIできなくなる
    private todoService: TodoService,
  ) { }

  ngOnInit() {
    this.getTodos();
  }

  /**
   * add todos from api.
   * @returns void
   */
  addTodo(): void {
    const todo: Todo = new Todo();
    console.log(todo);
    this.todoService.addTodo(todo).subscribe((res) => {
      this.getTodos();
    });
  }

  /**
   * get todos from api.
   * @returns void
   */
  getTodos(): void {
    this.todoService.getTodoes()
      .subscribe(todos => this.todos = todos); // subscribe -> Angularで使う非同期モジュール
  }

  /**
  * save todo.
  */
 saveTodo(todo: Todo) {
  this.todoService.updateTodo(todo).subscribe((res) => {
    this.getTodos();
  });
}

}
