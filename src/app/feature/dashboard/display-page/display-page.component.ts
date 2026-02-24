import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ShowTaskComponent } from '../show-task/show-task.component';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-display-page',
  imports: [CommonModule, FormsModule, NewTaskComponent, ShowTaskComponent],
  templateUrl: './display-page.component.html',
  styleUrl: './display-page.component.scss',
})
export class DisplayPageComponent implements OnInit {
  ngOnInit(): void {
    // const observable = new Observable((sub) => { // Producer function - called for each subscriber - unicast observable
    //   sub.next(1);
    //   sub.next(2); 
    //   sub.next(3);
    // });
    // const subject = new Subject(); // Multicast to all subscribers
    // const subject = new BehaviorSubject<number>(100); // Latest value to new subscribers
    // const subject = new ReplaySubject<number>(2,1000); // Buffer size and window time for new subscribers
    // subject.next(1);
    // subject.next(2);
    // subject.next(3);

    //Subscriber 1
    // subject.subscribe((data) => {
    //   console.log('Subscriber 1:' + data);
    // });
    //Subscriber 2
    // subject.subscribe((data) => {
    //   console.log('Subscriber 2:' + data);
    // });
    // subject.next(2020);
    //Subscriber 3
    // subject.subscribe((data) => {
    //   console.log('Subscriber 3:' + data);
    // });
    // subject.next(2023);
    // subject.complete();
    // subject.next(3);

    // Async Subject (Latest value to all subscribers when the subject is completed)
    // const subject = new AsyncSubject();
    // subject.next(1);
    // subject.next(2);
    // subject.next(3);
    //Subscriber 1
    // subject.subscribe((data) => {
    //   console.log('Subscriber 1:' + data);
    // });
    // subject.next(2020);
    //Subscriber 2
    // subject.subscribe((data) => {
    //   console.log('Subscriber 2:' + data);
    // });
    // subject.next(2023);
    // subject.complete();

    //Promise vs Observable
    const promise = new Promise((resolve, reject) => {
      console.log('Promise is called');
      resolve(100);
      resolve(200);
      resolve(300);
    });
    promise.then((data) => {
      console.log(data);
    });
    const obs = new Observable((sub) => {
      console.log('Observable is called');
      sub.next(100);
      sub.next(200);
      sub.next(300);
    });
    obs.subscribe((data) => console.log(data));
  }
}
