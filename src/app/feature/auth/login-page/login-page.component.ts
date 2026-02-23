// e:\Audit Management System\Frontend\src\app\feature\auth\login-page\login-page.component.ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage: string = ''; 

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email!, password!).subscribe({
        next: (success) => {
          if (success) {
            this.errorMessage = ''; 
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Invalid email or password';
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred during login. Please try again.';
        }
      });
    }
  }
}
