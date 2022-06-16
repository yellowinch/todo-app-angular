export class Task {
  id: number;
  content: string; // todo内容
  done: boolean; // 是否完成

  constructor(id: number = 0, content: string = '', done: boolean = false) {
    this.id = id;
    this.content = content;
    this.done = done;
  }
}
