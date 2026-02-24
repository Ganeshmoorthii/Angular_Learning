import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ShowTaskComponent } from '../show-task/show-task.component';


@Component({
  selector: 'app-display-page',
  imports: [ CommonModule, FormsModule, NewTaskComponent, ShowTaskComponent],
  templateUrl: './display-page.component.html',
  styleUrl: './display-page.component.scss'
})
export class DisplayPageComponent {

}
