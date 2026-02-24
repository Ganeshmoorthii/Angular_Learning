import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-new-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss'
})
export class NewTaskComponent {
  newTask: string = '';
  taskService: TaskService = inject(TaskService);
  createTask() {
    this.taskService.onCreateTask(this.newTask);
    this.newTask = '';
  }
}
