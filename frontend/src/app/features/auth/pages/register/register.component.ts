import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = '';
  loading = false;
  success = false;

  form = this.fb.group({
    name: ['', [Validators.required, this.noWhitespaceValidator, Validators.pattern(/^[A-Za-z][\s\S]*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), this.noWhitespaceValidator]]
  });

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').toString().trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  submit() {
    if (this.form.invalid) {
      this.error = 'Please fill in all fields correctly';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = false;

    this.auth.register(this.form.value as any).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed';
        this.success = false;
      }
    });
  }
}
