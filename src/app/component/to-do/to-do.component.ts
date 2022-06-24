import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task.model';
import { TasksService } from '../../../tasks.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'content-Type': 'application/json' }),
};

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  editedTask: Task = new Task();
  tasks: any[] = [];
  toDoTasks: Task[] = [];
  completedTasks: Task[] = [];
  private serviceUrl = 'http://127.0.0.1:8080/tasks';
  editIndex: number = 0; // 展示当前的input 隐藏label
  constructor(
    private taskService: TasksService,
    private ref: ChangeDetectorRef,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.findTaskList();
    console.log(this.tasks);
    this.onCheck();
  }
  onCheck() {
    setTimeout(() => {
      this.toDoTasks = this.tasks.filter((task) => !task.completed);
      this.completedTasks = this.tasks.filter((task) => task.completed);
      console.log('this.completedTasks ', this.completedTasks);
    }, 0);
  }
  getTaskList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.serviceUrl);
  }
  findTaskList(): void {
    console.log(this.getTaskList());
    this.getTaskList().subscribe((data) => (this.tasks = data));
    console.log(this.tasks);
  }

  clickLabel(id: number, task: Task) {
    this.editIndex = id;
    this.editedTask = task;
    console.log('click id', id);
  }
  // @ts-ignore
  enter(e: any, id: number) {
    console.log('enter', e.target.value);
    let newName: string;
    newName = e.target.value.toString();
    const url = `${this.serviceUrl}/${id}`;
    this.taskService.edit(id, newName);
    this.httpClient
      .put(
        url,
        {
          name: newName,
          completed: this.editedTask.completed,
        },
        httpOptions
      )
      .subscribe(() => {
        this.findTaskList();
      });
    this.editIndex = -1;
  }
  deleteTask(task: Task): void {
    const id = task.id;
    const url = `${this.serviceUrl}/${id}`;
    this.httpClient.delete(url).subscribe();
    this.tasks = this.tasks.filter((h) => h !== task);
    this.onCheck();
    this.ref.detectChanges();
  }
  //
  // deleteTask(id: number) {
  //   console.log('id', id);
  //   this.delete(id);
  //   this.onCheck();
  //   this.ref.detectChanges();
  //   console.log('this.tasks', this.tasks);
  // }
  // delete(task: Task | number): Observable<Task> {
  //   const id = typeof task === 'number' ? task : task.id;
  //   const url = `${this.serviceUrl}/${id}`;
  //   const deleteHttpOptions = {
  //     headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  //     body: task,
  //   };
  //   return this.httpClient.delete(url);
  // }
}
