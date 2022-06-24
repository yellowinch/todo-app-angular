export class Task {
  id: number;
  name: string; // todo内容
  completed: boolean; // 是否完成

  constructor(id: number = 0, name: string = '', completed: boolean = false) {
    this.id = id;
    this.name = name;
    this.completed = completed;
  }
}
