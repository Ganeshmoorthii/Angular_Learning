import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}


  navigateToHome() {
    this.router.navigateByUrl('/');
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }


  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}