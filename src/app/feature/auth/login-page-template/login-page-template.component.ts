import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login-page-template',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page-template.component.html',
  styleUrl: './login-page-template.component.scss'
})
export class LoginPageTemplateComponent {
  // Login Object for Template Driven Forms
  LoginData: any = {
    email: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if(this.LoginData.email && this.LoginData.password) {
      this.authService.login(this.LoginData.email, this.LoginData.password).subscribe({
        next: (success) => {
          if (success) {
            this.errorMessage = '';
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error: () => {
          this.errorMessage =
            'An error occurred during login. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields';
    }
  }
}
