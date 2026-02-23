import { Component, Input,ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { User } from '../../../core/models';


@Component({
  selector: 'app-display-names',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './display-names.component.html',
  styleUrl: './display-names.component.scss'
})
export class DisplayNamesComponent {
  @Input() UserDetails : User[] = [];
   @Output() viewUser = new EventEmitter<User>();

  onViewClick(user: User) {
    this.viewUser.emit(user);
  }
}
