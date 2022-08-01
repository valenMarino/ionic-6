import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public taskList: any[] = [];
  constructor() {
    this.storageLoad();
  }

  addTask(newTask: string) {
    let object = {
      id: 0,
      tittle: newTask,
      date: new Date(),
      finishDate: null,
      done: false,
      item: [],
    };
    this.taskList.push(object);
    this.storageSave();
    return object.id;
  }

  storageSave() {
    let taskList: string = JSON.stringify(this.taskList);
    localStorage.setItem('taskList', taskList);
  }

  storageLoad() {
    let taskList = localStorage.getItem('taskList');
    if (taskList == null) {
      return (this.taskList = []);
    }
    let tasks = JSON.parse(taskList);
    this.taskList = tasks;
  }
}
