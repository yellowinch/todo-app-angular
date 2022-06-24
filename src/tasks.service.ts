import { Injectable } from '@angular/core';

import { Task } from './app/shared/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  init_tasks: Task[] = [
    {
      id: 1,
      name: 'Mow lawn',
      completed: false,
    },
    {
      id: 2,
      name: 'Wash car',
      completed: false,
    },
    {
      id: 3,
      name: 'Buy groceries',
      completed: false,
    },
    {
      id: 4,
      name: 'Add validation',
      completed: true,
    },
    {
      id: 5,
      name: 'Add tests for frontend',
      completed: false,
    },
  ];
  tasks: Task[] = [];
  getTasks(): Task[] {
    return this.tasks;
  }
  init() {
    for (const element of this.init_tasks) {
      this.tasks.push(
        new Task(element['id'], element['name'], element['completed'])
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
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log('this.tasks in service', this.tasks);
  }

  edit(id: number, content: string) {
    let filteredTask = this.getTaskById(id);
    if (filteredTask.length == 0) {
      return;
    }
    let editedTask = filteredTask[0];
    editedTask.name = content;
    this.tasks = this.tasks.map((t) => {
      return t.id === editedTask.id ? editedTask : t;
    });
  }

  getTaskById(id: number): Task[] {
    return this.tasks.filter((task) => task.id == id);
  }
}
