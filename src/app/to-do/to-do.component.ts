import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  tasks: Task[] = [];
  toDoTasks: Task[] = [];
  completedTasks: Task[] = [];
  editIndex: number = 0; // 展示当前的input 隐藏label
  constructor(
    private taskService: TasksService,
    private ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.taskService.init();
    this.tasks = this.taskService.getTasks();
    console.log(this.tasks);
    this.onCheck();
  }
  onCheck() {
    setTimeout(() => {
      this.toDoTasks = this.tasks.filter((task) => !task.done);
      this.completedTasks = this.tasks.filter((task) => task.done);
    }, 0);
    console.log('completedTasks', this.completedTasks.length);
  }

  clickLabel(id: number) {
    this.editIndex = id;
    console.log('click id', id);
  }
  enter(e: any, id: number) {
    console.log('enter', e.target.value);
    let newContent: string;
    newContent = e.target.value.toString();
    this.taskService.edit(id, newContent);
    this.editIndex = -1;
  }

  deleteTask(id: number) {
    console.log('id', id);
    this.taskService.delete(id);
    this.tasks = this.taskService.getTasks();
    this.onCheck();
    this.ref.detectChanges();
    console.log('this.tasks', this.tasks);
  }
}
