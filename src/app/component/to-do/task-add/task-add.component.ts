import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'content-Type': 'application/json' }),
};

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent {
  private serviceUrl = 'http://127.0.0.1:8080/tasks';
  @Output() check = new EventEmitter();
  @Output() getTasks = new EventEmitter();
  newTaskContent = '';

  constructor(private httpClient: HttpClient) {}

  onKey(event: any) {
    this.newTaskContent = event.target.value;
  }

  add(taskContent: string): Observable<string> {
    return this.httpClient.post<string>(
      this.serviceUrl,
      {
        name: taskContent,
      },
      httpOptions
    );
  }

  addTask(): void {
    if (!this.newTaskContent) {
      return;
    }
    this.add(this.newTaskContent).subscribe((res) => {
      if (!!res) {
        this.getTasks.emit();
      }
    });
    this.check.emit();
  }
}
