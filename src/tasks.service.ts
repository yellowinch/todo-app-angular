import { Injectable } from '@angular/core';

import { Task } from './app/shared/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  init_tasks: Task[] = [
    {
      id: 1,
      content: 'Mow lawn',
      done: false,
    },
    {
      id: 2,
      content: 'Wash car',
      done: false,
    },
    {
      id: 3,
      content: 'Buy groceries',
      done: false,
    },
    {
      id: 4,
      content: 'Add validation',
      done: true,
    },
    {
      id: 5,
      content: 'Add tests for frontend',
      done: false,
    },
  ];
  tasks: Task[] = [];
  getTasks(): Task[] {
    return this.tasks;
  }
  init() {
    for (let i = 0; i < this.init_tasks.length; i++) {
      this.tasks.push(
        new Task(
          this.init_tasks[i]['id'],
          this.init_tasks[i]['content'],
          this.init_tasks[i]['done']
        )
      );
    }
  }

  add(newTaskContent: string) {
    let newTask = new Task(this.getHighestId() + 1, newTaskContent, false);
    console.log(this.getHighestId());
    this.tasks.push(newTask);
  }

  getHighestId(): number {
    return Math.max.apply(
      Math,
      this.tasks.map((item) => {
        return item.id;
      })
    );
  }

  delete(id: number) {
    // this.tasks.splice(
    //   this.tasks.findIndex((task) => task.id === id),
    //   1
    // );
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log('this.tasks in service', this.tasks);
  }

  edit(id: number, content: string) {
    let filteredTask = this.getTaskById(id);
    if (filteredTask.length == 0) {
      return;
    }
    let editedTask = filteredTask[0];
    editedTask.content = content;
    this.tasks = this.tasks.map((t) => {
      return t.id === editedTask.id ? editedTask : t;
    });
  }

  getTaskById(id: number): Task[] {
    return this.tasks.filter((task) => task.id == id);
  }
}
