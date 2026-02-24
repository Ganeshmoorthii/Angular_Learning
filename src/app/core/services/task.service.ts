import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // CreateTask: EventEmitter<string> = new EventEmitter<string>();
  CreateTask = new Subject<string>()
  onCreateTask(value : string){
    this.CreateTask.next(value);
    console.log(value);
  }
  constructor() { }
}
