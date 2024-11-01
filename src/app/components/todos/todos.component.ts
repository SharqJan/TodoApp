import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = {
    id:"",
    description:'',
    createdDateTime: new Date(),
    isCompleted : false,
    completedDateTime : new Date(),
    isDelete: false,
  deletedDateTime : new Date()
  };
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getAllTodos();
  }
  getAllTodos(){
    this.todoService.getAllTodos()
       .subscribe({
         next: (todos) => {
           this.todos = todos;
         }
        });
  }
   addTodo()
   {
   // console.log(this.newTodo);
      this.todoService.addTodo(this.newTodo)
      .subscribe({
        next: (todo) => {
          this.getAllTodos();
        }
      })
   }
   onCompletedChange(id : string, todo : Todo)
   {
    debugger;
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(id, todo)
    .subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    })
   }
   deleteTodo(id : string)
   {

    this.todoService.deleteTodo(id)
    .subscribe({
      next: (response) => {
        this.getAllTodos();
      }
    })
   }
}
