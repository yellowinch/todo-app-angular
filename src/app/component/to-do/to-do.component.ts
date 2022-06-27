import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from '../../shared/task.model';
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
  constructor(private ref: ChangeDetectorRef, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.findTaskList();
    this.onCheck();
  }

  onCheck() {
    setTimeout(() => {
      this.toDoTasks = this.tasks.filter((task) => !task.completed);
      this.completedTasks = this.tasks.filter((task) => task.completed);
    }, 0);
  }

  getTaskList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.serviceUrl);
  }

  findTaskList(): void {
    this.getTaskList().subscribe((data) => {
      this.tasks = data;
      this.onCheck();
    });
  }

  clickLabel(id: number, task: Task) {
    this.editIndex = id;
    this.editedTask = task;
  }

  changeTaskState(id: number, task: Task) {
    this.editedTask = task;
    const url = `${this.serviceUrl}/${id}`;
    this.httpClient
      .put(
        url,
        {
          name: task.name,
          completed: !this.editedTask.completed,
        },
        httpOptions
      )
      .subscribe(() => {
        this.findTaskList();
        this.onCheck();
      });
  }

  editTask(e: any, id: number) {
    let newName: string;
    newName = e.target.value.toString();
    const url = `${this.serviceUrl}/${id}`;
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
        this.onCheck();
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
}
