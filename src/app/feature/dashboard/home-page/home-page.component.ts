import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RegisterPageComponent } from '../../auth/register-page/register-page.component';
import { DisplayNamesComponent } from '../display-names/display-names.component';
// import { ɵEmptyOutletComponent } from "@angular/router";
import { ChildComponent } from '../child/child.component';
import { TestComponent } from '../test/test.component';
import { fromEvent } from 'rxjs';
import { TimestampPipe } from '../../../shared/pipes/timestamp.pipe';
import { TimeagoPipe } from '../../../shared/pipes/timeago.pipe';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    HeaderComponent,
    DisplayNamesComponent,
    ChildComponent,
    TestComponent,
    TimestampPipe,
    TimeagoPipe,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, AfterViewInit {
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'id',
    'fullName',
    'email',
    'role',
    'registerTimestamp',
    'registerAgo',
    'editOptions',
  ];
  dataSource: User[] = [];

  @ViewChild('createButton') createButton!: ElementRef;

  buttonClicked() {
    fromEvent(this.createButton.nativeElement, 'click').subscribe((data) => {
      console.log('Create button clicked!', data);
      this.showItem();
    });
  }

  showItem() {
    let div = document.createElement('div');
    div.innerText = 'Item';
    document.getElementById('container')!.appendChild(div);
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  ngAfterViewInit() {
    this.buttonClicked();
  }

  trackByUser(index: number, user: User): string {
    return user.id;
  }

  loadUserData() {
    this.authService.getUserData().subscribe({
      next: (data: User[]) => {
        this.dataSource = data;
        console.log('User Data:', this.dataSource);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(RegisterPageComponent, {
      width: '600px',
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUserData();
      }
    });
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe({
        next: () => {
          console.log('User deleted successfully');
          this.loadUserData();
        },
        error: (err) => console.error('Error deleting user:', err),
      });
    }
  }
  handleViewUser(user: User) {
    console.log('Parent received user to view:', user);
  }
}
