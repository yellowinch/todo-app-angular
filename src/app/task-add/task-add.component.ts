import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent implements OnInit {
  newTaskContent = '';
  constructor(private taskService: TasksService) {}

  ngOnInit(): void {}
  onKey(event: any) {
    this.newTaskContent = event.target.value;
  }

  addTask() {
    this.taskService.add(this.newTaskContent);
  }
}
