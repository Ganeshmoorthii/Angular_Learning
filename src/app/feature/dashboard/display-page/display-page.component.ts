import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ShowTaskComponent } from '../show-task/show-task.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-display-page',
  imports: [CommonModule, FormsModule, NewTaskComponent, ShowTaskComponent],
  templateUrl: './display-page.component.html',
  styleUrl: './display-page.component.scss',
})
export class DisplayPageComponent implements OnInit {
  ngOnInit(): void {
    // const subject = new Subject();
    const subject = new BehaviorSubject<number>(100);
    //Subscriber 1
    subject.subscribe((data) => {
      console.log('Subscriber 1:' + data);
    });
    //Subscriber 2
    subject.subscribe((data) => {
      console.log('Subscriber 2:' + data);
    });
    subject.next(2020);
    //Subscriber 3
    subject.subscribe((data) => {
      console.log('Subscriber 3:' + data);
    });
    subject.next(2023);
    // subject.complete();
    // subject.next(3);
  }
}
