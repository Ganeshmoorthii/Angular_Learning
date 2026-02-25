import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Form,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ShowTaskComponent } from '../show-task/show-task.component';
import {
  AsyncSubject,
  BehaviorSubject,
  forkJoin,
  mergeMap,
  Observable,
  of,
  ReplaySubject,
  Subject,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display-page',
  imports: [
    CommonModule,
    FormsModule,
    // NewTaskComponent,
    // ShowTaskComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './display-page.component.html',
  styleUrl: './display-page.component.scss',
})
export class DisplayPageComponent implements OnInit {
  stateData$ = of(['Mp', 'MH', 'Goa']);
  cityData$ = of(['Pune', 'Nagpur', 'Mumbai', 'Solapur']);
  http = inject(HttpClient);

  searchControl: FormControl = new FormControl('');
  constructor() {
    // this.searchControl.valueChanges.subscribe((search: string) => {
    //   this.http
    //     .get('https://dummyjson.com/products/search?q=' + search)
    //     .subscribe((res: any) => {
    //       console.log('User res' + JSON.stringify(res));
    //     });
    // });

    this.searchControl.valueChanges
      .pipe(
        mergeMap((search: string) => {
          return this.http.get(
            'https://dummyjson.com/products/search?q=' + search,
          );
        }),
      )
      .subscribe((res: any) => {
        console.log('User res' + JSON.stringify(res));
      });

    const $users = this.http.get('https://jsonplaceholder.typicode.com/users');
    const $posts = this.http.get('https://jsonplaceholder.typicode.com/posts');
    forkJoin([$users, $posts]).subscribe((res: any) => {
      // debugger;
    });
    forkJoin([this.stateData$, this.cityData$]).subscribe((res: any) => {
      // debugger;
    });
    this.stateData$.subscribe((res: any) => {
      // debugger;
    });
    this.cityData$.subscribe((res: any) => {
      // debugger;
    });
  }

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
    // const promise = new Promise((resolve, reject) => {
    //   console.log('Promise is called');
    //   resolve(100);
    //   resolve(200);
    //   resolve(300);
    // });
    // promise.then((data) => {
    //   console.log(data);
    // });
    // const obs = new Observable((sub) => {
    //   console.log('Observable is called');
    //   sub.next(100);
    //   sub.next(200);
    //   sub.next(300);
    // });
    // obs.subscribe((data) => console.log(data));
  }
}
