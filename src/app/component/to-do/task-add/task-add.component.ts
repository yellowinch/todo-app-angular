import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../../../tasks.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss'],
})
export class TaskAddComponent implements OnInit {
  @Output() check = new EventEmitter();
  newTaskContent = '';
  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onKey(event: any) {
    this.newTaskContent = event.target.value;
  }

  addTask() {
    this.taskService.add(this.newTaskContent);
    this.check.emit();
  }
}
