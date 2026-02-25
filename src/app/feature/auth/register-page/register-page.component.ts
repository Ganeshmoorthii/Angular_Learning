import { Component, inject, OnInit, Optional, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent implements OnInit {
  private authService = inject(AuthService);
  registerForm: FormGroup;
  isEditMode = false;
  userId: string | null = null;

  passwordRequirements = [
    { key: 'minLength', label: 'Minimum 8 characters' },
    { key: 'uppercase', label: '1 uppercase letter (A-Z)' },
    { key: 'lowercase', label: '1 lowercase letter (a-z)' },
    { key: 'number', label: '1 number (0-9)' },
    { key: 'special', label: '1 special character (@$!%*?&)' }
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    @Optional() private dialogRef: MatDialogRef<RegisterPageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        this.customPasswordValidator()
      ]],
      role: ['', [Validators.required]],
      contactNumbers: this.fb.array([]),
      registerTimestamp: [''],
      agreeTerms: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit(): void {
    // Check if component is opened as a dialog with user data
    if (this.data && this.data.user) {
      this.isEditMode = true;
      this.userId = this.data.user.id;
      this.patchForm(this.data.user);
    }
  }

  /**
   * Patches the form with existing user details
   */
  patchForm(user: User) {
    this.registerForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      agreeTerms: true 
    });

    // In edit mode, password is only required if the user wants to change it
    const passwordControl = this.registerForm.get('password');
    passwordControl?.clearValidators();
    passwordControl?.setValidators([this.customPasswordValidator()]);
    passwordControl?.updateValueAndValidity();

    // Populate contact numbers FormArray
    if (user.contactNumbers && Array.isArray(user.contactNumbers)) {
      const contactNumbersArray = this.contactNumbers;
      contactNumbersArray.clear();
      user.contactNumbers.forEach((num: any) => {
        const val = typeof num === 'string' ? num : num.number;
        contactNumbersArray.push(this.fb.control(val, [
          Validators.required,
          Validators.pattern(/^\d{10}$/)
        ]));
      });
    }
  }

  customPasswordValidator() {
    return (control: AbstractControl) => {
      const value = control.value;
      if (!value) return null;

      const errors: any = {};
      if (value.length < 8) errors['minLength'] = true;
      if (!/[A-Z]/.test(value)) errors['uppercase'] = true;
      if (!/[a-z]/.test(value)) errors['lowercase'] = true;
      if (!/\d/.test(value)) errors['number'] = true;
      if (!/[@$!%*?&]/.test(value)) errors['special'] = true;

      return Object.keys(errors).length > 0 ? errors : null;
    };
  }

  get contactNumbers(): FormArray {
    return this.registerForm.get('contactNumbers') as FormArray;
  }

  addContactNumber() {
    this.contactNumbers.push(this.fb.control('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]));
  }
  
  removeContactNumber(index: number) {
    this.contactNumbers.removeAt(index);
  }

  getFailedRequirements(): string[] {
    const passwordControl = this.registerForm.get('password');
    const errors = passwordControl?.errors || {};
    return this.passwordRequirements
      .filter(req => errors[req.key])
      .map(req => req.label);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const now = new Date().toISOString();
    this.registerForm.patchValue({ registerTimestamp: now });

    const formValue = this.registerForm.value;
    const userData: any = {
      ...formValue,
      contactNumbers: formValue.contactNumbers.map((num: string) => ({ number: num }))
    };

    if (this.isEditMode && this.userId) {
      userData.id = this.userId;
      if (!userData.password) {
        delete userData.password;
      }
      
      this.authService.updateUser(userData).subscribe({
        next: (response) => {
          console.log('Update successful:', response);
          this.dialogRef?.close(true);
        },
        error: (err) => console.error('Update failed:', err)
      });
    } else {
      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => console.error('Registration failed:', err)
      });
    }
  }

  closeDialog() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
