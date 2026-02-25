import { Component } from '@angular/core';
import { LoginPageTemplateComponent } from '../login-page-template/login-page-template.component';
import { LoginPageReactiveComponent } from '../login-page-reactive/login-page-reactive.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginPageReactiveComponent, LoginPageTemplateComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  showReactive: boolean = false;

  constructor(private router: Router) {}

  toggleLoginMethod() {
    this.showReactive = !this.showReactive;
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
