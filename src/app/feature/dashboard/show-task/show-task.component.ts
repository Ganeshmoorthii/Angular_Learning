import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';


@Component({
  selector: 'app-show-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.scss'
})
export class ShowTaskComponent implements OnInit {
  tasks: string[] = ['task 1', 'task 2', 'task 3'];
  taskService: TaskService = inject(TaskService);
  ngOnInit() {
    this.taskService.CreateTask.subscribe((newTask: string) => {
      this.tasks.push(newTask);
    });
  }
}
