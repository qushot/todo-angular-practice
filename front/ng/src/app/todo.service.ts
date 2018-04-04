import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Todo } from './todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoService {

  private todosUrl = 'http://localhost:3000/todos';

  constructor(
    private http: HttpClient,
  ) { }

  // add todo.
  addTodo(todo: Todo): Observable<any> {
      const url = `${this.todosUrl}`
      return this.http.post(url, todo, httpOptions);
  }

  // get todos.
  getTodoes(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        tap(res => this.log(`fetched todos`)),
        catchError(this.handleError('getTodoes', []))
      );
  }

  // update todo.
  updateTodo(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions).pipe(
      tap(res => this.log(`updated todo`)),
      catchError(this.handleError<any>('updateTodo'))
    );
  }

  /**
   * common error handler.
   * @param operation - failed operation name.
   * @param result - return value.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better error handle.
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // write log.
  private log(message: string) {
    console.log('TodoService: ' + message);
  }
}